"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const factory_service_1 = tslib_1.__importDefault(require("../services/factory.service"));
const category_model_1 = tslib_1.__importDefault(require("../models/category.model"));
class CategoryController {
    constructor() {
        this.factoryService = new factory_service_1.default();
        this.createMessage = "Created Category Successfully!";
        this.getOneMessage = "Created Category Successfully!";
        this.updatedMessage = "Updated Category Successfully!";
        this.deleteddMessage = "Deleted Category Successfully!";
        this.createNewCategory = this.factoryService.createOne(category_model_1.default, this.createMessage);
        this.getCategoryById = this.factoryService.getOne(category_model_1.default, { path: 'products' });
        this.getAllCategories = this.factoryService.getAll(category_model_1.default);
        this.updateCategoryById = this.factoryService.updateOne(category_model_1.default, this.updatedMessage);
        this.delelteCategoryById = this.factoryService.deleteOne(category_model_1.default, this.deleteddMessage);
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map