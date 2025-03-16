"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const factory_service_1 = tslib_1.__importDefault(require("../services/factory.service"));
const product_model_1 = tslib_1.__importDefault(require("../models/product.model"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = tslib_1.__importDefault(require("../utils/appError"));
const removeDiacritics_1 = require("../utils/removeDiacritics");
class ProductController {
    constructor() {
        this.factoryService = new factory_service_1.default();
        this.createMessage = 'Created Product Successfully!';
        this.updatedMessage = 'Created Product Successfully!';
        this.deleteddMessage = 'Deleted Product Successfully!';
        this.searchProductsBySlug = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let { query } = request.query; // Get the search query from the query parameter
            if (!query || typeof query !== 'string') {
                return next(new appError_1.default('Query parameter is required', 400));
            }
            const removedDiacritics = (0, removeDiacritics_1.removeVietnameseDiacritics)(query.toString().trim()); // Loại bỏ tất cả dấu cách ở 2 đầu trong query (nếu cần)
            const clearQuery = removedDiacritics.replace(/\s+/g, '-'); // Thay thế dấu cách bằng dấu gạch nối
            // Tìm kiếm slug không phân biệt chữ hoa chữ thường
            const products = yield product_model_1.default.find({
                slug: { $regex: new RegExp(clearQuery, 'i') },
            })
                .limit(10) // Giới hạn kết quả tìm kiếm là 10 sản phẩm
                .exec();
            if (products.length === 0) {
                return next(new appError_1.default('No products found matching the search criteria', 404));
            }
            response.status(200).json({
                status: 'success',
                totals: products.length,
                results: {
                    products,
                },
            });
        }));
        this.getProductBySlug = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let { query } = request.query;
            console.log('query', query);
            if (!query || typeof query !== 'string') {
                return next(new appError_1.default('Query parameter is required', 400));
            }
            const removedDiacritics = (0, removeDiacritics_1.removeVietnameseDiacritics)(query.toString().trim()); // Loại bỏ tất cả dấu cách ở 2 đầu trong query (nếu cần)
            const clearQuery = removedDiacritics.replace(/\s+/g, '-'); // Thay thế dấu cách bằng dấu gạch nối
            // Tìm kiếm slug không phân biệt chữ hoa chữ thường
            const product = yield product_model_1.default.findOne({
                slug: { $regex: new RegExp(clearQuery, 'i') },
            }).exec();
            if (!product) {
                return next(new appError_1.default('No product found matching the search criteria', 404));
            }
            response.status(200).json({
                status: 'success',
                results: {
                    product,
                },
            });
        }));
        this.getAllProducts = this.factoryService.getAll(product_model_1.default);
        this.getProductById = this.factoryService.getOne(product_model_1.default, { path: 'reviews' });
        this.createNewProduct = this.factoryService.createOne(product_model_1.default, this.createMessage);
        this.updateProductById = this.factoryService.updateOne(product_model_1.default, this.updatedMessage);
        this.delelteProductById = this.factoryService.deleteOne(product_model_1.default, this.deleteddMessage);
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map