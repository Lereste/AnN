import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { uploadImages } from '../middlewares/upload-images.middleware';
import resizeTourimageList from '../middlewares/base64-resize-images.middleware';
import AuthController from '../controllers/auth.controller';
import CategoryController from '../controllers/category.controller';

class CategoryRouter {
  public path = '/categories/';
  public router = Router();
  public categoryController = new CategoryController();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.categoryController.getAllCategories);
    this.router.get(this.path + ':id', this.categoryController.getCategoryById);

    this.router.use(this.path, this.authController.protect, this.authController.restrictTo('admin', 'staff')); // Protect route

    this.router.post(this.path, this.categoryController.createNewCategory);
    this.router.patch(this.path + ':id', this.categoryController.updateCategoryById);
    this.router.delete(this.path + ':id', this.categoryController.delelteCategoryById);
  }
}

export default CategoryRouter;
