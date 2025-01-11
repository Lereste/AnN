"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const product_controller_1 = tslib_1.__importDefault(require("../controllers/product.controller"));
const upload_images_middleware_1 = require("../middlewares/upload-images.middleware");
const resize_images_middleware_1 = tslib_1.__importDefault(require("../middlewares/resize-images.middleware"));
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const review_routes_1 = tslib_1.__importDefault(require("./review.routes"));
class ProductRouter {
    constructor() {
        this.path = '/products/';
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
        this.authController = new auth_controller_1.default();
        this.reviewRouter = new review_routes_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path + 'search', this.productController.searchProductsBySlug);
        this.router.get(this.path + 'productItem', this.productController.getProductBySlug);
        this.router.use(this.path + ':productId', this.reviewRouter.router); // ...api/v1/products/productId/reviews (extends all method)
        this.router.get(this.path + ':id', this.productController.getProductById);
        this.router.get(this.path, this.productController.getAllProducts);
        // =========== Protect route
        this.router.use(this.path, this.authController.protect, this.authController.restrictTo('admin', 'staff'));
        this.router.post(this.path, upload_images_middleware_1.uploadImages, resize_images_middleware_1.default, this.productController.createNewProduct);
        this.router.patch(this.path + ':id', upload_images_middleware_1.uploadImages, resize_images_middleware_1.default, this.productController.updateProductById);
        this.router.delete(this.path + ':id', this.productController.delelteProductById);
    }
}
exports.default = ProductRouter;
//# sourceMappingURL=product.routes.js.map