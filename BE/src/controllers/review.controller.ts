import FactoryService from '../services/factory.service';
import ReviewModel from '../models/review.model';
import { catchAsync } from '../utils/catchAsync';

class ReviewController {
    private factoryService = new FactoryService();
    private createMessage: string = 'Created Review Successfully!';
    private getOneMessage: string = 'Created Review Successfully!';
    private updatedMessage: string = 'Updated Review Successfully!';
    private deleteddMessage: string = 'Deleted Review Successfully!';

    public setProductAndUserIds = catchAsync(async (request, response, next) => {
        console.log('request.body', request.body);

        // Allow nested routes: Assign productId from the params if not provided
        if (!request.body.product) {
            request.body.product = request.params.productId; // From the parent route
        }

        if (!request.body.user) {
            request.body.user = request.user.id; // From the authenticated user
        }

        next();
    })

    public getAllReviews = this.factoryService.getAll(ReviewModel);

    public getReviewById = this.factoryService.getOne(ReviewModel);

    public createNewReview = this.factoryService.createOne(ReviewModel, this.createMessage);

    public updateReviewById = this.factoryService.updateOne(ReviewModel, this.updatedMessage);

    public delelteReviewById = this.factoryService.deleteOne(ReviewModel, this.deleteddMessage);
}

export default ReviewController;
