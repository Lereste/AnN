"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("../config");
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const appError_1 = tslib_1.__importDefault(require("../utils/appError"));
const catchAsync_1 = require("../utils/catchAsync");
const auth_service_1 = tslib_1.__importDefault(require("../services/auth.service"));
const email_1 = require("../utils/email");
const crypto = tslib_1.__importStar(require("crypto"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        // private _sendResponseStatus =
        this.signUp = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const userExist = await UserModel.exists({ email: request.body.email });
            const { name, email, role, password, passwordConfirm } = request.body;
            const userExist = yield user_model_1.default.exists({ email });
            if (userExist) {
                throw new appError_1.default('This email is already in use. Please use it to log in or select forgot password', 422);
            }
            // const newUser = await User.create(request.body);
            // Tạo bằng cách này thì server chỉ lưu trữ những fields ở dưới, nếu user nhập nhiều input hơn những fields trên thì nó sẽ không store
            const newUser = yield user_model_1.default.create({
                name,
                email,
                role,
                password,
                passwordConfirm,
                // passwordChangedAt: request.body.passwordChangedAt,
            });
            // hide data for client - still exit in mongoose database
            // newUser.password = undefined;
            // newUser.passwordConfirm = undefined;
            // response.status(201).json({
            //     status: "success",
            //     message: "Sign up successfully!",
            //     data: {
            //         user: newUser,
            //     },
            // });
            this.authService.createSendToken(newUser, 200, response, 'Sign up successfully!');
        }));
        this.logIn = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            // 1) Check if email and password are exit
            if (!email || !password) {
                return next(new appError_1.default('Please provide email and password!', 400));
            }
            // 2) Check if user exists && password is correct
            const user = yield user_model_1.default.findOne({ email }).select('+password');
            const correctPassword = yield this.authService.comparePassword(password, user.password);
            if (!user || !correctPassword) {
                return next(new appError_1.default('Incorrect email or password', 401));
            }
            this.authService.createSendToken(user, 200, response, 'Login successfully!');
        }));
        this.logOut = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Vì không thể xoá đc cookie nên ta sẽ ghi đè lên nó
            response.cookie('jwt', 'loggedout', {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true,
            });
            response.status(200).json({
                status: 'success',
            });
        }));
        this.protect = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const { passwordChangedAt } = request.body;
            // 1) Get the token and check if it is exit
            const headerAuthorization = request.headers.authorization;
            let token;
            if (headerAuthorization && headerAuthorization.startsWith('Bearer')) {
                token = headerAuthorization.split(' ')[1];
            }
            else if (request.cookies.jwt) {
                token = request.cookies.jwt;
            }
            // token and cookies
            if (!token) {
                return next(new appError_1.default('You are not logged in! Please log in to get access', 401));
            }
            // 2) Verification token
            // const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
            // const decoded = await this._jwtVerifyPromisified(token as string, JWT_SECRET as string) as any;
            // const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
            // console.log('check token', token, JWT_SECRET);
            const decoded = (yield this.authService.verifyToken(token, config_1.JWT_SECRET));
            // 3) Check if user still exists
            // console.log('decoded', decoded); // decoded { id: '668f95607b48d3049303159b', iat: 1720767966, exp: 1728543966 }
            if (!decoded) {
                // Delete thằng user này ra khỏi database > cho dù còn token vẫn không login đc > kh làm đc gì
                return next(new appError_1.default('The user belonging to this token does no longer exist.', 401));
            }
            // 4) Check if user changed password after the token (JWT) was issued (expired)
            // Khi đổi password thì field passwordChangedAt sẽ update thời gian, khi đó ta so sánh nó với thời gian tạo của token
            const currentUser = yield user_model_1.default.findById(decoded.id);
            if (this.authService.changedPasswordAfter(decoded.iat, currentUser.passwordChangedAt)) {
                throw new appError_1.default('User recently changed password! Please log in again.', 401);
            }
            // Grant access to protected route
            request.user = currentUser;
            response.locals.user = currentUser;
            next();
        }));
        this.isLoggedIn = (request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (request.cookies.jwt) {
                try {
                    // 1) Verification token
                    const decoded = (yield this.authService.verifyToken(request.cookies.jwt, config_1.JWT_SECRET));
                    // 2) Check if user still exists
                    if (!decoded) {
                        return next();
                    }
                    // 3) Check if user changed password after the token (JWT) was issued (expired)
                    // Khi đổi password thì field passwordChangedAt sẽ update thời gian, khi đó ta so sánh nó với thời gian tạo của token
                    const currentUser = yield user_model_1.default.findById(decoded.id);
                    if (this.authService.changedPasswordAfter(currentUser, currentUser.passwordChangedAt)) {
                        return next();
                    }
                    // There is a logged in user
                    response.locals.user = currentUser;
                    return next();
                }
                catch (error) {
                    return next();
                }
            }
            next();
        });
        this.restrictTo = (...roles) => {
            return (request, response, next) => {
                // roles ['admin', 'lead-guide']
                console.log('request.user.role', request.user);
                if (!request.user || !roles.includes(request.user.role)) {
                    return next(new appError_1.default('You do not have permission to perform this action', 403));
                }
                next();
            };
        };
        this.forgotPassword = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 1) Get User based on POSTed email
            const user = yield user_model_1.default.findOne({ email: request.body.email });
            if (!user) {
                return next(new appError_1.default('There is no user with that email address!', 404));
            }
            // 2) Generate the random reset token
            const resetToken = this.authService.createResetPasswordToken();
            yield user.save({ validateBeforeSave: false });
            // 3) Send it to the user's email
            const resetURL = `${request.protocol}://${request.get('host')}/api/v1/users/resetPassword/${resetToken}`;
            const message = `Forgot your password? Submit a PATCH request with your password and passwordConfirm to: ${resetURL}. \n If you didn't forget your password. please ignore this email!`;
            try {
                yield (0, email_1.sendEmailAsync)({
                    email: user.email,
                    subject: 'Your password reset token valid for 10 mins',
                    message: message,
                });
                response.status(200).json({
                    status: 'success',
                    message: 'Token sent to email!',
                });
            }
            catch (error) {
                user.passwordResetToken = undefined; // delete it in database when error
                user.passwordResetExpires = undefined; // delete it in database when error
                yield user.save({ validateBeforeSave: false });
                //   console.log(error.message);
                return next(new appError_1.default('There was an error sending the email. Try again later!', 500));
            }
        }));
        this.resetPassword = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 1) Get user based on the token
            const hashedToken = crypto.createHash('sha256').update(request.params.token).digest('hex');
            const user = yield user_model_1.default.findOne({
                passwordResetToken: hashedToken,
                passwordResetExpires: { $gt: Date.now() },
            });
            // 2) If token has not expired, and there is user, set the new password
            if (!user) {
                return next(new appError_1.default('Token is invalid or has expired!', 400));
            }
            user.password = request.body.password;
            user.passwordConfirm = request.body.passwordConfirm;
            user.passwordResetToken = undefined; // xóa nó trong database khi cập nhật password thành công ~ token chỉ dùng đc 1 lần
            user.passwordResetExpires = undefined; // xóa nó trong database khi cập nhật password thành công ~ token chỉ dùng đc 1 lần
            yield user.save();
            // 3) Update changePasswordAt property for the user (userModel.js)
            // 4) Log the user in and send JWT
            this.authService.createSendToken(user, 200, response, 'Password has been changed! You can now log in.');
            //   const loginToken = signToken(user._id);
            //   response.status(200).json({
            //     status: "success",
            //     message: "Password has been changed! You can now log in.",
            //     loginToken,
            //     expiresIn: process.env.JWT_EXPIRES_IN,
            //   });
        }));
        this.updatePassword = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 1) Get user from Collections
            const user = yield user_model_1.default.findById(request.user._id).select('+password');
            console.log('user', user);
            // 2) Check if POSTed current password is correct
            // "admin123" === "$2a$12$HD/Bx8BHvtf2nyVhIDsG6OoJEag9qwmipOdPECIQiiB5M84oUfenu"
            // So sánh giữa password (mat khau input khi login) với user.password (mk của user đã tạo trước đó trong database)
            const correctPassword = yield this.authService.comparePassword(request.body.passwordCurrent, user.password);
            if (!correctPassword) {
                return next(new appError_1.default('Your current password is wrong!', 401));
            }
            // 3) If correct, update password and passwordConfirm fields
            user.password = request.body.password;
            user.passwordConfirm = request.body.passwordConfirm;
            yield user.save();
            // Note: User.findByIdAndUpdate will NOT work as intended! because passwordConfirm validation only work on CREATE or SAVE, in this case it is UPDATE
            // 4) Log user in, send JWT
            this.authService.createSendToken(user, 200, response, 'Update to new password successfully!');
        }));
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map