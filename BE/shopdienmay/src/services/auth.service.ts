import { JWT_EXPIRES_IN, JWT_SECRET } from "../config";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { CookieOptions } from "../interfaces/cookie-options";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

class AuthService {
    // USED TO GENERATE JWT WITH PAYLOAD AND OPTIONS AS PARAMETERS.
    // THE PAYLOAD CONTAINS THE DATA WHICH WILL BE SET AS JWT PAYLOAD.
    // OPTIONS CONTAIN JWT OPTIONS
    public generateJWT = function (
        newUserId: object = {},
        options: object = {}
    ): string {
        const payload = { id: newUserId };
        const privateKey: string = JWT_SECRET;
        const defaultOptions: object = {
            expiresIn: "1h",
        };

        return jwt.sign(
            payload,
            privateKey,
            Object.assign(defaultOptions, options)
        );
    };

    public createSendToken = (
        user: any,
        statusCode: number,
        response?: Response,
        message?: string
    ) => {
        // Render secret key in terminal: node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"

        const token = this.generateJWT(user._id);

        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const expirationDate = new Date(); // // Calculate the expiration date

        const cookieOptions: CookieOptions = {
            //   expiresIn: new Date(
            // Date.now(JWT_EXPIRES_IN * 24 * 60 * 60 * 1000), // 24h * 60min * (60 * 1000 milliseconds)
            //   ),

            expiresIn: expirationDate.setTime(
                expirationDate.getTime() +
                    (JWT_EXPIRES_IN as any) * millisecondsPerDay
            ),
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

    public comparePassword = async function (
        requestBodyPassword: string,
        hashedPasswordOnStorage: string
    ): Promise<boolean> {
        return await bcrypt.compare(
            requestBodyPassword,
            hashedPasswordOnStorage
        );
    };

    public verifyToken = async (token: string, secret: string) => {
        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(token, secret);
            console.log("decoded", decoded); // decoded { id: '668f95607b48d3049303159b', iat: 1720767966, exp: 1728543966 }
    
            // Return the payload
            return decoded;
        } catch (error) {
            // Handle the error if the token is invalid or expired
            console.error('Error verifying token:', error);
            return null;
        }
    }

    public changedPasswordAfter = function (JWTTimestamp: any, passwordChangedAt: any) {
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

    public createResetPasswordToken = function () {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    
        // console.log({
        //     'resetToken': resetToken,
        //     'passwordResetToken': this.passwordResetToken
        // });
    
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // token is available 10 minutes - 1000 is mins
    
        return resetToken;
    }

}

export default AuthService;
