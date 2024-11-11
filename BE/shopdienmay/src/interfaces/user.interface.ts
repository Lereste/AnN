// import { IRole } from './roleInterface';

export interface IUser extends Document{
    name: string;
    email: string;
    photo: string;
    role: string;
    password: string;
    passwordConfirm: string;
    passwordChangedAt: Date,
    passwordResetToken: string,
    passwordResetExpires: Date,
    // comparePassword?: any;
}
