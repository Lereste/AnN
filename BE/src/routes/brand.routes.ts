import { Router } from 'express';
import BrandController from '../controllers/brand.controller';
import AuthController from '../controllers/auth.controller';
import { uploadImages } from '../middlewares/upload-images.middleware';
import resizeImageListWithCloudinaryMiddleware from '../middlewares/cloudinary-resize-images.middleware';

class BrandRouter {
  public path = '/brands/';
  public router = Router();
  public brandController = new BrandController();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.brandController.getAllBrands);
    this.router.get(this.path + ':id', this.brandController.getBrandById);

    this.router.use(this.path, this.authController.protect, this.authController.restrictTo('admin', 'staff'));

    this.router.post(this.path, uploadImages, resizeImageListWithCloudinaryMiddleware, this.brandController.createNewBrand);
    this.router.patch(this.path + ':id', this.brandController.updateBrandById);
    this.router.delete(this.path + ':id', this.brandController.deleteBrandById);
  }
}

export default BrandRouter; 