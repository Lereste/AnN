import { Request, Response, NextFunction } from 'express';

const catchAsync = fn => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next); // Pass any error to the next middleware
    };
};

// // A higher-order function to catch async errors
// const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
//     return (req: Request, res: Response, next: NextFunction): void => {
//       fn(req, res, next).catch(next);
//     };
//   };

//EXPORT
export {
    catchAsync,
};
