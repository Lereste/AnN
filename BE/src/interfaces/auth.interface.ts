import { IUser } from "./user.interface";
import { Request } from 'express';

interface File extends Express.Multer.File {}

interface Files {
    photo: File[];
    image: File[];
    imageList: File[];
    [fieldname: string]: File[];
}

export interface HeaderRequest extends Request {
    headers: { authorization: string };
    cookies: { jwt: string };
    user: IUser;
    files: Files
}

export interface RestrictToRequest extends Request {
    user?: { role: string };
}
