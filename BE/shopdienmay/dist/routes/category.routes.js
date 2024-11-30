"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const category_controller_1 = tslib_1.__importDefault(require("../controllers/category.controller"));
class CategoryRouter {
    constructor() {
        this.path = '/api/v1/categories/';
        this.router = (0, express_1.Router)();
        this.categoryController = new category_controller_1.default();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.categoryController.getAllCategories);
        this.router.get(this.path + ':id', this.categoryController.getCategoryById);
        this.router.use(this.authController.protect, this.authController.restrictTo('admin')); // Protect route
        this.router.post(this.path, this.categoryController.createNewCategory);
        this.router.patch(this.path + ':id', this.categoryController.updateCategoryById);
        this.router.delete(this.path + ':id', this.categoryController.delelteCategoryById);
    }
}
exports.default = CategoryRouter;
//# sourceMappingURL=category.routes.js.map