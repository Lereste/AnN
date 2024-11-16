"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const product_controller_1 = tslib_1.__importDefault(require("../controllers/product.controller"));
const upload_images_middleware_1 = require("../middlewares/upload-images.middleware");
const resize_images_middleware_1 = tslib_1.__importDefault(require("../middlewares/resize-images.middleware"));
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
class ProductRouter {
    constructor() {
        this.path = '/api/v1/products/';
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path + ':id', this.productController.getProductById);
        this.router.patch(this.path + ':id', upload_images_middleware_1.uploadImages, resize_images_middleware_1.default, this.productController.updateProductById);
        this.router.delete(this.path + ':id', this.productController.delelteProductById);
        this.router.get(this.path, this.authController.protect, this.productController.getAllProducts);
        this.router.post(this.path, upload_images_middleware_1.uploadImages, resize_images_middleware_1.default, this.productController.createNewProduct);
    }
}
exports.default = ProductRouter;
//# sourceMappingURL=product.routes.js.map