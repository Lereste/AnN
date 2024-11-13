import { NextFunction, Request, Response } from "express";
import { IUser } from "./user.interface";
import { Request as ExpressRequest } from 'express';
export interface AuthRequest extends ExpressRequest {
    user: IUser;
    headers: { authorization: string };
    cookies: { jwt: string }
};