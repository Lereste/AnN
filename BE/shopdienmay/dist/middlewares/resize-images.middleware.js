"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const catchAsync_1 = require("../utils/catchAsync");
const resizeImageList = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const requestFiles = request.files;
    // if (!requestFiles.image || !requestFiles.imageList) return;
    // image aka product image
    if (requestFiles.image) {
        if (request.params.id) {
            request.body.image = `image-of-id-${request.params.id}-updatedAt-${Date.now()}.jpeg`;
        }
        else {
            request.body.image = `image-createdAt-${Date.now()}.jpeg`;
        }
        yield (0, sharp_1.default)(requestFiles.image[0].buffer)
            .resize(2000, 1333)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/img/products/${request.body.image}`);
    }
    if (requestFiles.imageList) {
        request.body.imageList = [];
        yield Promise.all(requestFiles.imageList.map((file, idx) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            let fileName;
            if (request.params.id) {
                fileName = `imageList-of-id-${request.params.id}-updatedAt-${Date.now()}-index-${idx + 1}.jpeg`;
            }
            else {
                fileName = `imageList-createdAt-${Date.now()}-index-${idx + 1}.jpeg`;
            }
            yield (0, sharp_1.default)(file.buffer)
                .resize(2000, 1333)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`public/img/products/${fileName}`);
            request.body.imageList.push(fileName);
        })));
    }
    next();
}));
exports.default = resizeImageList;
//# sourceMappingURL=resize-images.middleware.js.map