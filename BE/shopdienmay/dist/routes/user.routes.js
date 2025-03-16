"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_controller_1 = tslib_1.__importDefault(require("../controllers/user.controller"));
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const upload_images_middleware_1 = require("../middlewares/upload-images.middleware");
const base64_resize_images_middleware_1 = tslib_1.__importDefault(require("../middlewares/base64-resize-images.middleware"));
class UserRouter {
    constructor() {
        this.path = '/users/';
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path + 'signup', this.authController.signUp);
        this.router.post(this.path + 'login', this.authController.logIn);
        this.router.get(this.path + 'logout', this.authController.logOut);
        this.router.post(this.path + 'forgotPassword', this.authController.forgotPassword);
        this.router.patch(this.path + 'resetPassword/:token', this.authController.resetPassword);
        this.router.use(this.path, this.authController.protect); //======= Protect all routes under =======
        this.router.patch(this.path + 'updateMyPassword', this.authController.updatePassword);
        this.router.patch(this.path + 'updateMe', upload_images_middleware_1.uploadImages, base64_resize_images_middleware_1.default, this.userController.updateAccount);
        this.router.get(this.path, this.authController.restrictTo('admin'), this.userController.getAllUsers);
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map