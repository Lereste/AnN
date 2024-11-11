import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from 'express';
import APIFeatures from "./apiFeatures.service";

class FactoryService {
    public getAll = (Model: any) =>
        catchAsync(async (request: any, response: Response, next: NextFunction) => {
            /*
                const reviewRouter = express.Router({mergeParams: true});
                Vì đã có mergeParams ở router, nên nếu ta call /tours/3123asd535(tourId)/review thì nó sẽ chạy getAll thay vì getOneTour theo id
            */

            // To allow for nested GET reviews on Tour
            let filter = {};
            if (request.params.productId) {
                filter = { product: request.params.productId }
                // console.log('filter', filter); // filter { tour: '5c88fa8cf4afda39709c2955' }
            }
            console.log('filter', filter);

            // Execute query
            const features = new APIFeatures(Model.find(filter), request.query as any)
                .filter()
                .sort()
                .limitFields()
                .paginate();

            // const documents = await features.query.explain();
            const documents = await features.query;



            // Send response
            response.status(200).json({
                status: "success",
                requestedAt: request.requestTime,
                results: documents.length,
                data: {
                    data: documents,
                },
            });
        });

    public getOne = (Model: any, message?: string, populateOptions?: Object) =>
        catchAsync(async (request: Request, response: Response, next: NextFunction) => {
            // Model.findOne({ _id: request.params.id})
            // const getOneDocument = await Model.findById(request.params.id).populate('reviews');

            let query = Model.findById(request.params.id);
            if (populateOptions) {
                query = query.populate(populateOptions);
            }

            const getOneDocument = await query;

            if (!getOneDocument) {
                return next(new AppError('No document found with that ID', 404));
            }

            response.status(200).json({
                status: "success",
                message,
                currentDocumentName: `${getOneDocument.name}`,
                data: {
                    data: getOneDocument,
                },
            });
        })

    public createOne = (Model: any, message?: string) =>
        catchAsync(async (request: Request, response: Response, next: NextFunction) => {
            // const newTour = new Tour({});
            // newTour.save();

            // console.log('[FactoryService] - Create: ', request.body);


            const newDocument = await Model.create(request.body)

            response.status(201).json({
                status: 'success',
                message,
                data: {
                    data: newDocument
                }
            })
        });


    public updateOne = (Model: any, message?: string) =>
        catchAsync(async (request: Request, response: Response, next: NextFunction) => {

            const updatedDocument = await Model.findByIdAndUpdate(request.params.id, request.body, {
                new: true, // Return the modified document rather than the original
                runValidators: true, // Validate the updated data against the model's schema
            })
            console.log(updatedDocument);

            if (!updatedDocument) {
                return next(new AppError('No document found with that ID', 404));
            }

            // await updatedDocument.save();
            updatedDocument.changedAt = Date.now() - 1000; // Add a custom field to track when the review was last changed
            updatedDocument.save();

            response.status(200).json({
                status: "success",
                message,
                data: {
                    data: updatedDocument,
                },
            });
        });

    public deleteOne = (Model: any, message?: string) =>
        catchAsync(async (request: Request, response: Response, next: NextFunction) => {
            const deleteDocument = await Model.findByIdAndDelete(request.params.id)

            if (!deleteDocument) {
                return next(new AppError('No documment found with that ID', 404));
            }

            response.status(204).json({
                status: "success",
                message,
                data: null
            });
        });
}

export default FactoryService