import { Request, Response, NextFunction } from 'express';

const catchAsync = fn => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};


//EXPORT
export {
    catchAsync,
};
