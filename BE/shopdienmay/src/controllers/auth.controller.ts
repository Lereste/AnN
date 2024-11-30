import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import UserModel from '../models/user.model';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import AuthService from '../services/auth.service';
import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../interfaces/request.interface';
import { sendEmailAsync } from '../utils/email';
import * as crypto from 'crypto';

class AuthController {
  public authService = new AuthService();

  // private _sendResponseStatus =

  public signUp = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
    // const userExist = await UserModel.exists({ email: request.body.email });

    const { name, email, role, password, passwordConfirm } = request.body;

    const userExist = await UserModel.exists({ email });
    if (userExist) {
      throw new AppError('This email is already in use. Please use it to log in or select forgot password', 422);
    }

    // const newUser = await User.create(request.body);
    // Tạo bằng cách này thì server chỉ lưu trữ những fields ở dưới, nếu user nhập nhiều input hơn những fields trên thì nó sẽ không store
    const newUser = await UserModel.create({
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
  });

  public logIn = catchAsync(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const { email, password } = request.body;

    // 1) Check if email and password are exit
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    // 2) Check if user exists && password is correct
    const user = await UserModel.findOne({ email }).select('+password');
    const correctPassword = await this.authService.comparePassword(password, user.password);

    if (!user || !correctPassword) {
      return next(new AppError('Incorrect email or password', 401));
    }

    this.authService.createSendToken(user, 200, response, 'Login successfully!');
  });

  public logOut = catchAsync(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    // Vì không thể xoá đc cookie nên ta sẽ ghi đè lên nó
    response.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    response.status(200).json({
      status: 'success',
    });
  });

  public protect = catchAsync(async (request: AuthRequest, response: Response, next: NextFunction) => {
    // const { passwordChangedAt } = request.body;
    // 1) Get the token and check if it is exit
    const headerAuthorization = request.headers.authorization;
    let token;

    if (headerAuthorization && headerAuthorization.startsWith('Bearer')) {
      token = headerAuthorization.split(' ')[1];
    } else if (request.cookies.jwt) {
      token = request.cookies.jwt;
    }

    // token and cookies
    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access', 401));
    }

    // 2) Verification token
    // const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
    // const decoded = await this._jwtVerifyPromisified(token as string, JWT_SECRET as string) as any;
    // const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // console.log('check token', token, JWT_SECRET);

    const decoded = (await this.authService.verifyToken(token, JWT_SECRET)) as JwtPayload;

    // 3) Check if user still exists
    // console.log('decoded', decoded); // decoded { id: '668f95607b48d3049303159b', iat: 1720767966, exp: 1728543966 }

    if (!decoded) {
      // Delete thằng user này ra khỏi database > cho dù còn token vẫn không login đc > kh làm đc gì
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    // 4) Check if user changed password after the token (JWT) was issued (expired)
    // Khi đổi password thì field passwordChangedAt sẽ update thời gian, khi đó ta so sánh nó với thời gian tạo của token
    const currentUser = await UserModel.findById(decoded.id);
    if (this.authService.changedPasswordAfter(decoded.iat, currentUser.passwordChangedAt)) {
      throw new AppError('User recently changed password! Please log in again.', 401);
    }

    // Grant access to protected route
    request.user = currentUser;
    response.locals.user = currentUser;
    next();
  });

  public isLoggedIn = async (request: AuthRequest, response: Response, next: NextFunction) => {
    if (request.cookies.jwt) {
      try {
        // 1) Verification token
        const decoded = (await this.authService.verifyToken(request.cookies.jwt, JWT_SECRET)) as JwtPayload;

        // 2) Check if user still exists
        if (!decoded) {
          return next();
        }

        // 3) Check if user changed password after the token (JWT) was issued (expired)
        // Khi đổi password thì field passwordChangedAt sẽ update thời gian, khi đó ta so sánh nó với thời gian tạo của token
        const currentUser = await UserModel.findById(decoded.id);
        if (this.authService.changedPasswordAfter(currentUser, currentUser.passwordChangedAt)) {
          return next();
        }

        // There is a logged in user
        response.locals.user = currentUser;
        return next();
      } catch (error) {
        return next();
      }
    }

    next();
  };

  public restrictTo = (...roles: string[]) => {
    return (request: AuthRequest, response: Response, next: NextFunction) => {
      // roles ['admin', 'lead-guide']
      if (!roles.includes(request.user.role)) {
        return next(new AppError('You do not have permission to perform this action', 403));
      }

      next();
    };
  };

  public forgotPassword = catchAsync(async (request: AuthRequest, response: Response, next: NextFunction) => {
    // 1) Get User based on POSTed email
    const user = await UserModel.findOne({ email: request.body.email });
    if (!user) {
      return next(new AppError('There is no user with that email address!', 404));
    }

    // 2) Generate the random reset token
    const resetToken = this.authService.createResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // 3) Send it to the user's email
    const resetURL = `${request.protocol}://${request.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your password and passwordConfirm to: ${resetURL}. \n If you didn't forget your password. please ignore this email!`;

    try {
      await sendEmailAsync({
        email: user.email,
        subject: 'Your password reset token valid for 10 mins',
        message: message,
      });

      response.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (error) {
      user.passwordResetToken = undefined; // delete it in database when error
      user.passwordResetExpires = undefined; // delete it in database when error
      await user.save({ validateBeforeSave: false });

      //   console.log(error.message);
      return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
  });

  public resetPassword = catchAsync(async (request: AuthRequest, response: Response, next: NextFunction) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(request.params.token).digest('hex');

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired!', 400));
    }

    user.password = request.body.password;
    user.passwordConfirm = request.body.passwordConfirm;
    user.passwordResetToken = undefined; // xóa nó trong database khi cập nhật password thành công ~ token chỉ dùng đc 1 lần
    user.passwordResetExpires = undefined; // xóa nó trong database khi cập nhật password thành công ~ token chỉ dùng đc 1 lần
    await user.save();

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
  });

  public updatePassword = catchAsync(async (request: any, response: Response, next: NextFunction) => {
    // 1) Get user from Collections
    const user = await UserModel.findById(request.user._id).select('+password');
    console.log('user', user);

    // 2) Check if POSTed current password is correct

    // "admin123" === "$2a$12$HD/Bx8BHvtf2nyVhIDsG6OoJEag9qwmipOdPECIQiiB5M84oUfenu"
    // So sánh giữa password (mat khau input khi login) với user.password (mk của user đã tạo trước đó trong database)
    const correctPassword = await this.authService.comparePassword(request.body.passwordCurrent, user.password);

    if (!correctPassword) {
      return next(new AppError('Your current password is wrong!', 401));
    }

    // 3) If correct, update password and passwordConfirm fields
    user.password = request.body.password;
    user.passwordConfirm = request.body.passwordConfirm;
    await user.save();

    // Note: User.findByIdAndUpdate will NOT work as intended! because passwordConfirm validation only work on CREATE or SAVE, in this case it is UPDATE

    // 4) Log user in, send JWT
    this.authService.createSendToken(user, 200, response, 'Update to new password successfully!');
  });
}

export default AuthController;
