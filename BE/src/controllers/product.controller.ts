import { Request, Response, NextFunction } from 'express';
import FactoryService from '../services/factory.service';
import ProductModel from '../models/product.model';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import { removeVietnameseDiacritics } from '../utils/removeDiacritics';

class ProductController {
  private factoryService = new FactoryService();
  private createMessage: string = 'Created Product Successfully!';
  private updatedMessage: string = 'Created Product Successfully!';
  private deleteddMessage: string = 'Deleted Product Successfully!';

  public searchProductsBySlug = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
    let { query } = request.query; // Get the search query from the query parameter

    if (!query || typeof query !== 'string') {
      return next(new AppError('Query parameter is required', 400));
    }

    const removedDiacritics = removeVietnameseDiacritics(query.toString().trim()); // Loại bỏ tất cả dấu cách ở 2 đầu trong query (nếu cần)
    const clearQuery = removedDiacritics.replace(/\s+/g, '-'); // Thay thế dấu cách bằng dấu gạch nối

    // Tìm kiếm slug không phân biệt chữ hoa chữ thường
    const products = await ProductModel.find({
      slug: { $regex: new RegExp(clearQuery, 'i') },
    })
      .limit(10) // Giới hạn kết quả tìm kiếm là 10 sản phẩm
      .exec();

    if (products.length === 0) {
      return next(new AppError('No products found matching the search criteria', 404));
    }

    response.status(200).json({
      status: 'success',
      totals: products.length,
      results: {
        products,
      },
    });
  });

  public getProductBySlug = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
    let { query } = request.query;

    console.log('query', query);

    if (!query || typeof query !== 'string') {
      return next(new AppError('Query parameter is required', 400));
    }

    const removedDiacritics = removeVietnameseDiacritics(query.toString().trim()); // Loại bỏ tất cả dấu cách ở 2 đầu trong query (nếu cần)
    const clearQuery = removedDiacritics.replace(/\s+/g, '-'); // Thay thế dấu cách bằng dấu gạch nối

    // Tìm kiếm slug không phân biệt chữ hoa chữ thường
    const product = await ProductModel.findOne({
      slug: { $regex: new RegExp(clearQuery, 'i') },
    }).exec();

    if (!product) {
      return next(new AppError('No product found matching the search criteria', 404));
    }

    response.status(200).json({
      status: 'success',
      results: {
        product,
      },
    });
  });

  public getAllProducts = this.factoryService.getAll(ProductModel);

  public getProductById = this.factoryService.getOne(ProductModel, { path: 'reviews' });

  public createNewProduct = this.factoryService.createOne(ProductModel, this.createMessage);

  public updateProductById = this.factoryService.updateOne(ProductModel, this.updatedMessage);

  public delelteProductById = this.factoryService.deleteOne(ProductModel, this.deleteddMessage);
}

export default ProductController;
