"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const catchAsync_1 = require("../utils/catchAsync");
const resizeImageListWithBase64 = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const requestFiles = request.files;
    // Product image (single)
    if (requestFiles.image) {
        const base64Image = (yield (0, sharp_1.default)(requestFiles.image[0].buffer)
            .resize(1000, 1000)
            // .toFormat("jpeg")
            // .jpeg({ quality: 90 })
            .toFormat('webp')
            .webp({ quality: 80 }) // Chuyển sang WebP, giảm chất lượng để tối ưu
            .toBuffer()).toString('base64');
        request.body.image = `data:image/jpeg;base64,${base64Image}`;
    }
    // Product imageList (multiple)
    if (requestFiles.imageList) {
        request.body.imageList = [];
        yield Promise.all(requestFiles.imageList.map((file) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            // Chuyển đổi ảnh thành Buffer rồi encode Base64
            const buffer = yield (0, sharp_1.default)(file.buffer).resize(200, 200).toFormat('jpeg').jpeg({ quality: 90 }).toBuffer();
            // Chuyển Buffer thành Base64
            const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
            // Lưu vào danh sách
            request.body.imageList.push(base64Image);
        })));
    }
    // User photo (single)
    if (requestFiles.photo) {
        const base64Photo = (yield (0, sharp_1.default)(requestFiles.photo[0].buffer)
            .resize(500, 500)
            //   .toFormat('jpeg')
            //   .jpeg({ quality: 90 })
            .toFormat('webp')
            .webp({ quality: 80 }) // Chuyển sang WebP, giảm chất lượng để tối ưu
            .toBuffer()).toString('base64');
        request.body.photo = `data:image/jpeg;base64,${base64Photo}`;
    }
    next();
}));
exports.default = resizeImageListWithBase64;
//# sourceMappingURL=base64-resize-images.middleware.js.map