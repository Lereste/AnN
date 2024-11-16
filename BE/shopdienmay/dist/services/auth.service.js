"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("../config");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const crypto = tslib_1.__importStar(require("crypto"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
class AuthService {
    constructor() {
        // USED TO GENERATE JWT WITH PAYLOAD AND OPTIONS AS PARAMETERS.
        // THE PAYLOAD CONTAINS THE DATA WHICH WILL BE SET AS JWT PAYLOAD.
        // OPTIONS CONTAIN JWT OPTIONS
        this.generateJWT = function (newUserId = {}, options = {}) {
            const payload = { id: newUserId };
            const privateKey = config_1.JWT_SECRET;
            const defaultOptions = {
                expiresIn: "1h",
            };
            return jwt.sign(payload, privateKey, Object.assign(defaultOptions, options));
        };
        this.createSendToken = (user, statusCode, response, message) => {
            // Render secret key in terminal: node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
            const token = this.generateJWT(user._id);
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            const expirationDate = new Date(); // // Calculate the expiration date
            const cookieOptions = {
                //   expiresIn: new Date(
                // Date.now(JWT_EXPIRES_IN * 24 * 60 * 60 * 1000), // 24h * 60min * (60 * 1000 milliseconds)
                //   ),
                expiresIn: expirationDate.setTime(expirationDate.getTime() +
                    config_1.JWT_EXPIRES_IN * millisecondsPerDay),
                // secure: true,
                httpOnly: true, // prevent cross-site scripting attacks
            };
            if (process.env.NODE_ENV === "production") {
                cookieOptions.secure = true; // the cookie is only be sent on an encrypted connection (httpS)
            }
            response.cookie("jwt", token, cookieOptions);
            // Hide password from output (Client) - still see in moongoose <--> Khác với ở trong userModel là mình xoá ở Client và Moongose thôi
            user.password = undefined;
            user.passwordConfirm = undefined;
            // Don't create token when user is Sign Up
            if (message === "Sign up successfully!") {
                response.status(statusCode).json({
                    status: "success",
                    message,
                    data: {
                        user: user,
                    },
                });
            }
            response.status(statusCode).json({
                status: "success",
                message,
                token,
                data: {
                    user: user,
                },
            });
        };
        this.comparePassword = function (requestBodyPassword, hashedPasswordOnStorage) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                return yield bcryptjs_1.default.compare(requestBodyPassword, hashedPasswordOnStorage);
            });
        };
        this.verifyToken = (token, secret) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // Verify the token using the secret key
                const decoded = jwt.verify(token, secret);
                console.log("decoded", decoded); // decoded { id: '668f95607b48d3049303159b', iat: 1720767966, exp: 1728543966 }
                // Return the payload
                return decoded;
            }
            catch (error) {
                // Handle the error if the token is invalid or expired
                console.error('Error verifying token:', error);
                return null;
            }
        });
        this.changedPasswordAfter = function (JWTTimestamp, passwordChangedAt) {
            console.log('JWTTimestamp', JWTTimestamp);
            console.log('passwordChangedAt', passwordChangedAt);
            if (passwordChangedAt) {
                let millisTimestamp = passwordChangedAt.getTime();
                let secondsTimestamp = (millisTimestamp / 1000).toString();
                const changedTimestamp = parseInt(secondsTimestamp, 10);
                console.log(JWTTimestamp, changedTimestamp);
                return JWTTimestamp < changedTimestamp; // 100 < 200
            }
            // false mean NOT changed the passwordChangedAt
            return false;
        };
        this.createResetPasswordToken = function () {
            const resetToken = crypto.randomBytes(32).toString('hex');
            this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            // console.log({
            //     'resetToken': resetToken,
            //     'passwordResetToken': this.passwordResetToken
            // });
            this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // token is available 10 minutes - 1000 is mins
            return resetToken;
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map