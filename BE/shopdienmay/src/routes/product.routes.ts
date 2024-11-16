import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { uploadImages } from "../middlewares/upload-images.middleware"
import resizeTourimageList from "../middlewares/resize-images.middleware";
import AuthController from "../controllers/auth.controller";

class ProductRouter {
    public path = '/api/v1/products/';
    public router = Router();
    public productController = new ProductController();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.path + ':id', this.productController.getProductById)
        this.router.patch(this.path + ':id', uploadImages, resizeTourimageList, this.productController.updateProductById);
        this.router.delete(this.path + ':id', this.productController.delelteProductById)

        this.router.use(this.authController.protect); 
        this.router.get(this.path, this.productController.getAllProducts)
        this.router.post(this.path, uploadImages, resizeTourimageList, this.productController.createNewProduct)
        
    }
}

export default ProductRouter;
