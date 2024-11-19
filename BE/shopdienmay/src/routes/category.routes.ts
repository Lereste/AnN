import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { uploadImages } from "../middlewares/upload-images.middleware"
import resizeTourimageList from "../middlewares/resize-images.middleware";
import AuthController from "../controllers/auth.controller";
import CategoryController from "../controllers/category.controller";

class CategoryRouter {
    public path = '/api/v1/categories/';
    public router = Router();
    public categoryController = new CategoryController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(this.path, this.categoryController.createNewCategory)
        this.router.get(this.path , this.categoryController.getAllCategories)
        
        this.router.get(this.path + ':id', this.categoryController.getCategoryById)
    }
}

export default CategoryRouter;
