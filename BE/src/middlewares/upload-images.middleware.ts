import multer from "multer";
import { Request, Response, NextFunction } from 'express';
import AppError from "../utils/appError";

const multerStorage = multer.memoryStorage(); // save in memory

const multerFilter = (request: Request, file: Express.Multer.File, cb: Function) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('This file is not image', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

// 1) upload.single('photo');

// 2)
export const uploadImages = upload.fields([
    // name is the key  in req.files
    { name: 'image', maxCount: 1 }, // product image
    { name: 'imageList', maxCount: 3 }, // product imageList
    { name: 'photo', maxCount: 1} // user photo
]);

// export default uploadImages;