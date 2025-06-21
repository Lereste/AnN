import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import convert from 'url-slug';
import CategoryModel from '../models/category.model';
import ProductModel from '../models/product.model';
import UserModel from '../models/user.model';
import AppError from '../utils/appError';
import APIFeatures from './apiFeatures.service';

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
        filter = { product: request.params.productId };
        // console.log('filter', filter); // filter { product: '5c88fa8cf4afda39709c2955' }
      }

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
        status: 'success',
        requestedAt: request.requestTime,
        totals: documents.length,
        results: {
          data: documents,
        },
      });
    });

  public getOne = (Model: any, populateOptions?: Object) =>
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
        status: 'success',
        currentDocumentName: `${getOneDocument.name}`,
        result: {
          data: getOneDocument,
        },
      });
    });

  public createOne = (Model: any, message?: string) =>
    catchAsync(async (request: Request, response: Response, next: NextFunction) => {
      if (Model === ProductModel || Model === UserModel || Model === CategoryModel) {
        const { name } = request.body;
        const nameExist = await Model.exists({ name });

        if (nameExist) {
          throw new AppError('This Name is already in use. Please try another Name', 422);
        }
      }

      let documment = request.body;

      // Generate slug here based on product name
      if (Model === ProductModel && documment.name) {
        documment.slug = convert(documment.name as string, {
          dictionary: {
            đ: 'd',
            Đ: 'D',
          },
        });

        const { slug } = request.body;
        const isExistSlug = await Model.exists({ slug });

        if (isExistSlug) {
          throw new AppError('This Slug is already in use. Please try another Name', 422);
        }

        // updateImageUrls(documment, 'http://localhost:1234/images/products/'); // Cập nhật URL cho hình ảnh sản phẩm
      }

      const newDocument = await Model.create(documment);

      response.status(201).json({
        status: 'success',
        message,
        result: {
          data: newDocument,
        },
      });
    });

  public updateOne = (Model: any, message?: string) =>
    catchAsync(async (request: Request, response: Response, next: NextFunction) => {
      const updatedDocument = await Model.findByIdAndUpdate(request.params.id, request.body, {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Validate the updated data against the model's schema
      });

      if (!updatedDocument) {
        return next(new AppError('No document found with that ID', 404));
      }

      // await updatedDocument.save();
      updatedDocument.changedAt = Date.now() - 1000; // Add a custom field to track when the review was last changed
      updatedDocument.save();

      response.status(200).json({
        status: 'success',
        message,
        result: {
          data: updatedDocument,
        },
      });
    });

  public deleteOne = (Model: any, message?: string) =>
    catchAsync(async (request: Request, response: Response, next: NextFunction) => {
      const deleteDocument = await Model.findByIdAndDelete(request.params.id);

      if (!deleteDocument) {
        return next(new AppError('No documment found with that ID', 404));
      }

      response.status(204).json({
        status: 'success',
        message,
        data: null,
      });
    });
}

export default FactoryService;
