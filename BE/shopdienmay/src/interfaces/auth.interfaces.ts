import { IUser } from "./user.interface";

export interface AuthInterface {
    user: IUser;
    accessToken: string;
}
