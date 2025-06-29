import sharp from 'sharp';
import { catchAsync } from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { HeaderRequest } from '../interfaces/auth.interface';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (buffer: Buffer, folder: string) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result?.secure_url);
    });
    Readable.from(buffer).pipe(stream);
  });
};

const resizeImageListWithCloudinaryMiddleware = catchAsync(
  async (request: HeaderRequest, response: Response, next: NextFunction) => {
    const requestFiles = request.files;

    // Product image (single)
    if (requestFiles.image) {
      const buffer = await sharp(requestFiles.image[0].buffer)
        .resize(500, 500, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }, // Nền trắng, có thể đổi alpha: 0 nếu muốn trong suốt
        })
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer();

      request.body.image = await uploadToCloudinary(buffer, 'products');
    }

    // Product imageList (multiple)
    if (requestFiles.imageList) {
      request.body.imageList = [];

      await Promise.all(
        requestFiles.imageList.map(async (file: any) => {
          const buffer = await sharp(file.buffer)
          .resize(500, 500, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }, // Nền trắng, có thể đổi alpha: 0 nếu muốn trong suốt
          })
          .toFormat('webp')
          .webp({ quality: 80 })
          .toBuffer();
          const imageUrl = await uploadToCloudinary(buffer, 'product-list');
          request.body.imageList.push(imageUrl);
        })
      );
    }

    // User photo (single)
    if (requestFiles.photo) {
      const buffer = await sharp(requestFiles.photo[0].buffer)
        .resize(500, 500, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }, // Nền trắng, có thể đổi alpha: 0 nếu muốn trong suốt
        })
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer();

      request.body.photo = await uploadToCloudinary(buffer, 'users');
    }

    // Brand logo (single)
    if (requestFiles.logo) {
      const buffer = await sharp(requestFiles.logo[0].buffer)
        .resize(500, 500, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }, // Nền trắng, có thể đổi alpha: 0 nếu muốn trong suốt
        })
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer();

      request.body.logo = await uploadToCloudinary(buffer, 'brands');
    }

    next();
  }
);

export default resizeImageListWithCloudinaryMiddleware;
