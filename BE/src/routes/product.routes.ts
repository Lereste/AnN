import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { uploadImages } from '../middlewares/upload-images.middleware';
import AuthController from '../controllers/auth.controller';
import ReviewRouter from './review.routes';
import resizeImageListWithBase64 from '../middlewares/base64-resize-images.middleware';
import { validateProductDiscountMiddleware } from '../middlewares/validate-product-discount.middleware';
import resizeImageListWithCloudinaryMiddleware from '../middlewares/cloudinary-resize-images.middleware';

class ProductRouter {
  public path = '/products/';
  public router = Router();
  public productController = new ProductController();
  public authController = new AuthController();

  private reviewRouter = new ReviewRouter();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {

    this.router.get(this.path + 'search', this.productController.searchProductsBySlug)

    this.router.get(this.path + 'productItem', this.productController.getProductBySlug)
    
    this.router.use(this.path + ':productId', this.reviewRouter.router) // ...api/v1/products/productId/reviews (extends all method)
    
    this.router.get(this.path + ':id', this.productController.getProductById);
    
    this.router.get(this.path, this.productController.getAllProducts);
    
    // =========== Protect route
    this.router.use(this.path, this.authController.protect, this.authController.restrictTo('admin', 'staff')); 
    
    this.router.post(this.path, uploadImages, resizeImageListWithCloudinaryMiddleware, this.productController.createNewProduct);
    
    this.router.patch(
      this.path + ':id',
      uploadImages,
      resizeImageListWithCloudinaryMiddleware,
      validateProductDiscountMiddleware,
      this.productController.updateProductById
    );
    
    this.router.delete(this.path + ':id', this.productController.delelteProductById);
  }
}

export default ProductRouter;