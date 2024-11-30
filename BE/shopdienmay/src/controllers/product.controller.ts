import { Request, Response, NextFunction } from 'express';
import FactoryService from '../services/factory.service';
import ProductModel from '../models/product.model';

class ProductController {
  private factoryService = new FactoryService();
  private createMessage: string = 'Created Product Successfully!';
  private updatedMessage: string = 'Created Product Successfully!';
  private deleteddMessage: string = 'Deleted Product Successfully!';

  // public createUser = async (req: Request, res: Response, next: NextFunction) => {
  // }

  public getAllProducts = this.factoryService.getAll(ProductModel);
  public getProductById = this.factoryService.getOne(ProductModel, { path: 'reviews' });
  public createNewProduct = this.factoryService.createOne(ProductModel, this.createMessage);
  public updateProductById = this.factoryService.updateOne(ProductModel, this.updatedMessage);
  public delelteProductById = this.factoryService.deleteOne(ProductModel, this.deleteddMessage);
}

export default ProductController;
