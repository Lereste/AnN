"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const review_controller_1 = tslib_1.__importDefault(require("../controllers/review.controller"));
class ReviewRouter {
    constructor() {
        this.path = '/reviews/';
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.reviewController = new review_controller_1.default();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use(this.path, this.authController.protect); // Protect route
        this.router.get(this.path, this.reviewController.getAllReviews);
        this.router.get(this.path + ':id', this.reviewController.getReviewById);
        this.router.post(this.path, this.authController.restrictTo('user'), this.reviewController.setProductAndUserIds, this.reviewController.createNewReview);
        this.router.patch(this.path + ':id', this.authController.restrictTo('user'), this.reviewController.updateReviewById);
        this.router.delete(this.path + ':id', this.authController.restrictTo('admin', 'staff'), this.reviewController.delelteReviewById);
    }
}
exports.default = ReviewRouter;
//# sourceMappingURL=review.routes.js.map