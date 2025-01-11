import sharp from "sharp";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { HeaderRequest } from "../interfaces/auth.interface";

const resizeImageList = catchAsync(
    async (request: HeaderRequest, response: Response, next: NextFunction) => {
        const requestFiles = request.files;
        // if (!requestFiles.image || !requestFiles.imageList) return;

        // Product image
        if (requestFiles.image) {
            if (request.params.id) {
                request.body.image = `image-of-id-${request.params.id}-updatedAt-${Date.now()}.jpeg`;
            } else {
                request.body.image = `image-createdAt-${Date.now()}.jpeg`;
            }

            await sharp(requestFiles.image[0].buffer)
                .resize(600, 600)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`src/assets/images/products/${request.body.image}`);
        }

        // Product imageList
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
                        .resize(200, 200)
                        .toFormat("jpeg")
                        .jpeg({ quality: 90 })
                        .toFile(`src/assets/images/products/${fileName}`);

                    request.body.imageList.push(fileName);
                })
            );
        }

        // User photo
        if (requestFiles.photo) {
            const convertFileName = requestFiles.photo[0].filename = `id-${request.user.id}-updatedAt-${Date.now()}.jpeg`
            
            await sharp(requestFiles.photo[0].buffer)
                .resize(500, 500)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`src/assets/images/users/${convertFileName}`);
        }

        next();
    }
);

export default resizeImageList;
