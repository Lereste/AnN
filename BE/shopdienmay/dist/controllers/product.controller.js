"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const factory_service_1 = tslib_1.__importDefault(require("../services/factory.service"));
const product_model_1 = tslib_1.__importDefault(require("../models/product.model"));
class ProductController {
    constructor() {
        this.factoryService = new factory_service_1.default();
        this.createMessage = 'Created Product Successfully!';
        this.updatedMessage = 'Created Product Successfully!';
        this.deleteddMessage = 'Deleted Product Successfully!';
        // public createUser = async (req: Request, res: Response, next: NextFunction) => {
        // }
        this.getAllProducts = this.factoryService.getAll(product_model_1.default);
        this.getProductById = this.factoryService.getOne(product_model_1.default, { path: 'reviews' });
        this.createNewProduct = this.factoryService.createOne(product_model_1.default, this.createMessage);
        this.updateProductById = this.factoryService.updateOne(product_model_1.default, this.updatedMessage);
        this.delelteProductById = this.factoryService.deleteOne(product_model_1.default, this.deleteddMessage);
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map