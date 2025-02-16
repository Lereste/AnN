import sharp from 'sharp';
import { catchAsync } from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import { HeaderRequest } from '../interfaces/auth.interface';

// Thằng trên có thể custom lại để dùng khi muốn upload ảnh lên cloud: Firebase
// const resizeImageList = catchAsync(
//     async (request: HeaderRequest, response: Response, next: NextFunction) => {
//         const requestFiles = request.files;
//         // if (!requestFiles.image || !requestFiles.imageList) return;

//         // Product image
//         if (requestFiles.image) {
//             if (request.params.id) {
//                 request.body.image = `image-of-id-${request.params.id}-updatedAt-${Date.now()}.jpeg`;
//             } else {
//                 request.body.image = `image-createdAt-${Date.now()}.jpeg`;
//             }

//             await sharp(requestFiles.image[0].buffer)
//                 .resize(600, 600)
//                 .toFormat("jpeg")
//                 .jpeg({ quality: 90 })
//                 .toFile(`src/assets/images/products/${request.body.image}`);
//         }

//         // Product imageList
//         if (requestFiles.imageList) {
//             request.body.imageList = [];

//             await Promise.all(
//                 requestFiles.imageList.map(async (file: any, idx: number) => {

//                     let fileName: string;
//                     if (request.params.id) {
//                         fileName = `imageList-of-id-${request.params.id}-updatedAt-${Date.now()}-index-${idx + 1}.jpeg`;
//                     } else {
//                         fileName = `imageList-createdAt-${Date.now()}-index-${idx + 1}.jpeg`;
//                     }

//                     await sharp(file.buffer)
//                         .resize(200, 200)
//                         .toFormat("jpeg")
//                         .jpeg({ quality: 90 })
//                         .toFile(`src/assets/images/products/${fileName}`);

//                     request.body.imageList.push(fileName);
//                 })
//             );
//         }

//         // User photo
//         if (requestFiles.photo) {
//             const convertFileName = requestFiles.photo[0].filename = `id-${request.user.id}-updatedAt-${Date.now()}.jpeg`

//             await sharp(requestFiles.photo[0].buffer)
//                 .resize(500, 500)
//                 .toFormat("jpeg")
//                 .jpeg({ quality: 90 })
//                 .toFile(`src/assets/images/users/${convertFileName}`);
//         }

//         next();
//     }
// );

const resizeImageListWithBase64 = catchAsync(async (request: HeaderRequest, response: Response, next: NextFunction) => {
  const requestFiles = request.files;

  // Product image (single)
  if (requestFiles.image) {
    const base64Image = (
      await sharp(requestFiles.image[0].buffer)
        .resize(1000, 1000)
        // .toFormat("jpeg")
        // .jpeg({ quality: 90 })
        .toFormat('webp')
        .webp({ quality: 80 }) // Chuyển sang WebP, giảm chất lượng để tối ưu
        .toBuffer()
    ).toString('base64');

    request.body.image = `data:image/jpeg;base64,${base64Image}`;
  }

  // Product imageList (multiple)
  if (requestFiles.imageList) {
    request.body.imageList = await Promise.all(
      requestFiles.imageList.map(async (file: any) => {
        const base64 = (
          await sharp(file.buffer)
            .resize(600, 600)
            //   .toFormat('jpeg')
            //   .jpeg({ quality: 90 })
            .toFormat('webp')
            .webp({ quality: 80 }) // Chuyển sang WebP, giảm chất lượng để tối ưu
            .toBuffer()
        ).toString('base64');

        return `data:image/jpeg;base64,${base64}`;
      })
    );
  }

  // User photo (single)
  if (requestFiles.photo) {
    const base64Photo = (
      await sharp(requestFiles.photo[0].buffer)
        .resize(500, 500)
        //   .toFormat('jpeg')
        //   .jpeg({ quality: 90 })
        .toFormat('webp')
        .webp({ quality: 80 }) // Chuyển sang WebP, giảm chất lượng để tối ưu
        .toBuffer()
    ).toString('base64');

    request.body.photo = `data:image/jpeg;base64,${base64Photo}`;
  }

  next();
});

export default resizeImageListWithBase64;
