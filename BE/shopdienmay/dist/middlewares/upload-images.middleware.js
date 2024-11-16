"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = void 0;
const tslib_1 = require("tslib");
const multer_1 = tslib_1.__importDefault(require("multer"));
const appError_1 = tslib_1.__importDefault(require("../utils/appError"));
const multerStorage = multer_1.default.memoryStorage(); // save in memory
const multerFilter = (request, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new appError_1.default('This file is not image', 400), false);
    }
};
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadImages = upload.fields([
    // name is the key  in req.files
    { name: 'image', maxCount: 1 },
    { name: 'imageList', maxCount: 3 }
]);
// export default uploadImages;
//# sourceMappingURL=upload-images.middleware.js.map