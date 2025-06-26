import sharp from 'sharp';
import { catchAsync } from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import { HeaderRequest } from '../interfaces/auth.interface';

const resizeImageListWithBase64 = catchAsync(async (request: HeaderRequest, response: Response, next: NextFunction) => {
  const requestFiles = request.files;

  // Product image (single)
  if (requestFiles.image) {
    const base64Image = (
      await sharp(requestFiles.image[0].buffer)
        .resize(1000, 1000)
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer()
    ).toString('base64');

    request.body.image = `data:image/jpeg;base64,${base64Image}`;
  }

  // Product imageList (multiple)
  if (requestFiles.imageList) {
    request.body.imageList = [];

    await Promise.all(
      requestFiles.imageList.map(async (file: any) => {
        // Chuyển đổi ảnh thành Buffer rồi encode Base64
        const buffer = await sharp(file.buffer).resize(200, 200).toFormat('jpeg').jpeg({ quality: 90 }).toBuffer();

        // Chuyển Buffer thành Base64
        const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        // Lưu vào danh sách
        request.body.imageList.push(base64Image);
      })
    );
  }

  // User photo (single)
  if (requestFiles.photo) {
    const base64Photo = (
      await sharp(requestFiles.photo[0].buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer()
    ).toString('base64');

    request.body.photo = `data:image/jpeg;base64,${base64Photo}`;
  }

  next();
});

export default resizeImageListWithBase64;
