"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_controller_1 = tslib_1.__importDefault(require("../controllers/user.controller"));
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
class UserRouter {
    constructor() {
        this.path = '/api/v1/users/';
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
        //======= Protect all routes under =======
        this.router.use(this.authController.protect);
        this.router.patch(this.path + 'updateMyPassword', this.authController.updatePassword);
        //======= sa
        this.router.use(this.authController.restrictTo('admin'));
        this.router.get(this.path, this.userController.getAllUsers);
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map