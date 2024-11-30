"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const factory_service_1 = tslib_1.__importDefault(require("../services/factory.service"));
const review_model_1 = tslib_1.__importDefault(require("../models/review.model"));
const catchAsync_1 = require("../utils/catchAsync");
class ReviewController {
    constructor() {
        this.factoryService = new factory_service_1.default();
        this.createMessage = 'Created Review Successfully!';
        this.getOneMessage = 'Created Review Successfully!';
        this.updatedMessage = 'Updated Review Successfully!';
        this.deleteddMessage = 'Deleted Review Successfully!';
        this.setProductAndUserIds = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('request.body', request.body);
            // Allow nested routes
            if (!request.body.product) {
                request.body.product = request.params.productId;
            }
            if (!request.body.user) {
                request.body.user = request.user.id;
            }
            next();
        }));
        this.getAllReviews = this.factoryService.getAll(review_model_1.default);
        this.getReviewById = this.factoryService.getOne(review_model_1.default);
        this.createNewReview = this.factoryService.createOne(review_model_1.default, this.createMessage);
        this.updateReviewById = this.factoryService.updateOne(review_model_1.default, this.updatedMessage);
        this.delelteReviewById = this.factoryService.deleteOne(review_model_1.default, this.deleteddMessage);
    }
}
exports.default = ReviewController;
//# sourceMappingURL=review.controller.js.map