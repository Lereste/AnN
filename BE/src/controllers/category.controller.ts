import FactoryService from '../services/factory.service';
import CategoryModel from '../models/category.model';
import ProductModel from '../models/product.model';
import BrandModel from '../models/brand.model';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

class CategoryController {
  private factoryService = new FactoryService();
  private createMessage: string = 'Created Category Successfully!';
  private getOneMessage: string = 'Created Category Successfully!';
  private updatedMessage: string = 'Updated Category Successfully!';
  private deleteddMessage: string = 'Deleted Category Successfully!';

  public createNewCategory = this.factoryService.createOne(CategoryModel, this.createMessage);
  public getCategoryById = this.factoryService.getOne(CategoryModel, { path: 'products' });
  public getAllCategories = this.factoryService.getAll(CategoryModel);
  public updateCategoryById = this.factoryService.updateOne(CategoryModel, this.updatedMessage);
  public delelteCategoryById = this.factoryService.deleteOne(CategoryModel, this.deleteddMessage);

  // GET /api/v1/categories/:categoryId/brands
  public getBrandsByCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const categoryId = req.params.id;
      
      // Check if categoryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return next(new AppError('Invalid category ID format', 400));
      }
      
      // Check if category exists first
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        return next(new AppError('No category found with that ID', 404));
      }
      
      const brandIds = await ProductModel.distinct('brandId', { categoryId });
      const brands = await BrandModel.find({ _id: { $in: brandIds } });
      
      // Check if brandIds array is empty
      if (brandIds.length === 0) {
        return next(new AppError('No brands found for this category', 404));
      }

      res.status(200).json({
        status: 'success',
        total: brands.length,
        result: {
            data: brands,
        }
      });
   
  });
}

export default CategoryController;
