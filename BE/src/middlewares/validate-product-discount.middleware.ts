import { Request, Response, NextFunction } from 'express';
import ProductModel from '../models/product.model';
import AppError from '../utils/appError';

/**
 * Middleware to validate priceDiscount < price when updating a product
 * Use for PATCH/PUT /products/:id
 */
export const validateProductDiscountMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const priceDiscount = req.body.priceDiscount !== undefined ? Number(req.body.priceDiscount) : undefined;
  let price = req.body.price !== undefined ? Number(req.body.price) : undefined;

  if (priceDiscount === undefined) return next();
  if (isNaN(priceDiscount)) return next(new AppError('priceDiscount must be a number', 400));

  // If price is not provided in body, get it from DB
  if (price === undefined) {
    const product = await ProductModel.findById(req.params.id).select('price');
    if (!product) return next(new AppError('Product not found', 404));
    price = product.price;
  }
  if (isNaN(price)) return next(new AppError('price must be a number', 400));

  if (priceDiscount >= price) return next(new AppError('Discount price should be below regular price', 400));

  next();
};
