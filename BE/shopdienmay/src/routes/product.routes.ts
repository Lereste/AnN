import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { uploadImages } from '../middlewares/upload-images.middleware';
import resizeImageList from '../middlewares/resize-images.middleware';
import AuthController from '../controllers/auth.controller';
import ReviewRouter from './review.routes';

class ProductRouter {
  public path = '/api/v1/products/';
  public router = Router();
  public productController = new ProductController();
  public authController = new AuthController();

  private reviewRouter = new ReviewRouter();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(':productId/reviews', this.reviewRouter.router)

    this.router.get(this.path + ':id', this.productController.getProductById);
    this.router.get(this.path, this.productController.getAllProducts);

    this.router.use(this.authController.protect, this.authController.restrictTo('admin') as any); // Protect route

    this.router.post(this.path, uploadImages, resizeImageList, this.productController.createNewProduct);
    this.router.delete(this.path + ':id', this.productController.delelteProductById);
    this.router.patch(this.path + ':id', uploadImages, resizeImageList, this.productController.updateProductById);
  }
}

export default ProductRouter;
