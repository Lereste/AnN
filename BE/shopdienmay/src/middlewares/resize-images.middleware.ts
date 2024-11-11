import sharp from "sharp";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { FileArray, UploadedFile } from "express-fileupload";

const resizeImageList = catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
        const requestFiles = request.files as any;
        // if (!requestFiles.image || !requestFiles.imageList) return;

        // image aka product image
        if (requestFiles.image) {
            if (request.params.id) {
                request.body.image = `image-of-id-${request.params.id}-updatedAt-${Date.now()}.jpeg`;
            } else {
                request.body.image = `image-createdAt-${Date.now()}.jpeg`;
            }

            await sharp(requestFiles.image[0].buffer)
                .resize(2000, 1333)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`public/img/products/${request.body.image}`);
        }

        if (requestFiles.imageList) {
            request.body.imageList = [];

            await Promise.all(
                requestFiles.imageList.map(async (file: any, idx: number) => {

                    let fileName: string;
                    if (request.params.id) {
                        fileName = `imageList-of-id-${request.params.id}-updatedAt-${Date.now()}-index-${idx + 1}.jpeg`;
                    } else {
                        fileName = `imageList-createdAt-${Date.now()}-index-${idx + 1}.jpeg`;
                    }

                    await sharp(file.buffer)
                        .resize(2000, 1333)
                        .toFormat("jpeg")
                        .jpeg({ quality: 90 })
                        .toFile(`public/img/products/${fileName}`);

                    request.body.imageList.push(fileName);
                })
            );
        }

        next();
    }
);

export default resizeImageList;
