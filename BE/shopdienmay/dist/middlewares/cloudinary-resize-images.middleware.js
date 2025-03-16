"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const catchAsync_1 = require("../utils/catchAsync");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const config_1 = require("../config");
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.CLOUDINARY_API_KEY,
    api_secret: config_1.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = (buffer, folder) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ folder }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result === null || result === void 0 ? void 0 : result.secure_url);
        });
        stream_1.Readable.from(buffer).pipe(stream);
    });
});
const resizeImageListWithCloudinary = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const requestFiles = request.files;
    // Product image (single)
    if (requestFiles.image) {
        const buffer = yield (0, sharp_1.default)(requestFiles.image[0].buffer)
            .resize(1000, 1000)
            .toFormat('webp')
            .webp({ quality: 80 })
            .toBuffer();
        request.body.image = yield uploadToCloudinary(buffer, 'products');
    }
    // Product imageList (multiple)
    if (requestFiles.imageList) {
        request.body.imageList = [];
        yield Promise.all(requestFiles.imageList.map((file) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const buffer = yield (0, sharp_1.default)(file.buffer).resize(200, 200).toFormat('jpeg').jpeg({ quality: 90 }).toBuffer();
            const imageUrl = yield uploadToCloudinary(buffer, 'product-list');
            request.body.imageList.push(imageUrl);
        })));
    }
    // User photo (single)
    if (requestFiles.photo) {
        const buffer = yield (0, sharp_1.default)(requestFiles.photo[0].buffer)
            .resize(500, 500)
            .toFormat('webp')
            .webp({ quality: 80 })
            .toBuffer();
        request.body.photo = yield uploadToCloudinary(buffer, 'users');
    }
    next();
}));
exports.default = resizeImageListWithCloudinary;
//# sourceMappingURL=cloudinary-resize-images.middleware.js.map