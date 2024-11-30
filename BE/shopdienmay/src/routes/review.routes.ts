import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { uploadImages } from '../middlewares/upload-images.middleware';
import resizeTourimageList from '../middlewares/resize-images.middleware';
import AuthController from '../controllers/auth.controller';
import ReviewController from '../controllers/review.controller';

class ReviewRouter {
    public path = '/api/v1/reviews/';
    public router = Router({ mergeParams: true });
    public reviewController = new ReviewController();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {

        this.router.use(this.authController.protect); // Protect route
        this.router.get(this.path, this.reviewController.getAllReviews);

        this.router.get(this.path + ':id', this.reviewController.getReviewById);

        this.router.post(this.path, this.reviewController.setProductAndUserIds, this.reviewController.createNewReview);
        this.router.patch(this.path + ':id', this.reviewController.updateReviewById);
        this.router.delete(
            this.path + ':id',
            this.authController.restrictTo('admin', 'user') as any,
            this.reviewController.delelteReviewById
        );
    }
}

export default ReviewRouter;
