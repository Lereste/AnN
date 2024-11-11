import { NextFunction, Request, Response } from "express";
import { IUser } from "./user.interface";

export type AuthRequest = Request & {
    user: IUser;
    headers: { authorization: string };
    cookies: { jwt: string }
};