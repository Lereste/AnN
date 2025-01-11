"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appError_1 = tslib_1.__importDefault(require("../utils/appError"));
const catchAsync_1 = require("../utils/catchAsync");
const apiFeatures_service_1 = tslib_1.__importDefault(require("./apiFeatures.service"));
const product_model_1 = tslib_1.__importDefault(require("../models/product.model"));
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const category_model_1 = tslib_1.__importDefault(require("../models/category.model"));
const url_slug_1 = tslib_1.__importDefault(require("url-slug"));
class FactoryService {
    constructor() {
        this._updateImageUrls = (item, baseImageUrl) => {
            if (item.image) {
                item.image = `${baseImageUrl}${item.image}`;
            }
            if (item.imageList) {
                if (typeof item.imageList === 'string') {
                    // Split the string by commas to create an array
                    item.imageList = item.imageList.split(',').map((imageUrl) => {
                        return `${baseImageUrl}${imageUrl.trim()}`; // Prepend base URL and remove extra spaces
                    });
                }
                else if (Array.isArray(item.imageList)) {
                    // If imageList is already an array, just prepend the base URL to each image
                    item.imageList = item.imageList.map((imageUrl) => {
                        return `${baseImageUrl}${imageUrl.trim()}`;
                    });
                }
            }
        };
        this.getAll = (Model) => (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            /*
                const reviewRouter = express.Router({mergeParams: true});
                Vì đã có mergeParams ở router, nên nếu ta call /tours/3123asd535(tourId)/review thì nó sẽ chạy getAll thay vì getOneTour theo id
            */
            // To allow for nested GET reviews on Tour
            let filter = {};
            if (request.params.productId) {
                filter = { product: request.params.productId };
                // console.log('filter', filter); // filter { product: '5c88fa8cf4afda39709c2955' }
            }
            // Execute query
            const features = new apiFeatures_service_1.default(Model.find(filter), request.query)
                .filter()
                .sort()
                .limitFields()
                .paginate();
            // const documents = await features.query.explain();
            const documents = yield features.query;
            // Send response
            response.status(200).json({
                status: "success",
                requestedAt: request.requestTime,
                totals: documents.length,
                results: {
                    data: documents,
                },
            });
        }));
        this.getOne = (Model, populateOptions) => (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Model.findOne({ _id: request.params.id})
            // const getOneDocument = await Model.findById(request.params.id).populate('reviews');
            let query = Model.findById(request.params.id);
            if (populateOptions) {
                query = query.populate(populateOptions);
            }
            const getOneDocument = yield query;
            if (!getOneDocument) {
                return next(new appError_1.default('No document found with that ID', 404));
            }
            response.status(200).json({
                status: "success",
                currentDocumentName: `${getOneDocument.name}`,
                result: {
                    data: getOneDocument,
                },
            });
        }));
        this.createOne = (Model, message) => (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (Model === product_model_1.default || Model === user_model_1.default || Model === category_model_1.default) {
                const { name } = request.body;
                const nameExist = yield Model.exists({ name });
                if (nameExist) {
                    throw new appError_1.default('This Name is already in use. Please try another Name', 422);
                }
            }
            let documment = request.body;
            // Generate slug here based on product name
            if (Model === product_model_1.default && documment.name) {
                documment.slug = (0, url_slug_1.default)(documment.name, {
                    dictionary: {
                        đ: 'd',
                        Đ: 'D',
                    },
                });
                const { slug } = request.body;
                const slugExist = yield Model.exists({ slug });
                if (slugExist) {
                    throw new appError_1.default('This Slug is already in use. Please try another Name', 422);
                }
                this._updateImageUrls(documment, 'http://localhost:1234/images/products/'); // Cập nhật URL cho hình ảnh sản phẩm
            }
            const newDocument = yield Model.create(documment);
            response.status(201).json({
                status: 'success',
                message,
                result: {
                    data: newDocument
                }
            });
        }));
        this.updateOne = (Model, message) => (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedDocument = yield Model.findByIdAndUpdate(request.params.id, request.body, {
                new: true, // Return the modified document rather than the original
                runValidators: true, // Validate the updated data against the model's schema
            });
            if (!updatedDocument) {
                return next(new appError_1.default('No document found with that ID', 404));
            }
            // await updatedDocument.save();
            updatedDocument.changedAt = Date.now() - 1000; // Add a custom field to track when the review was last changed
            updatedDocument.save();
            response.status(200).json({
                status: "success",
                message,
                result: {
                    data: updatedDocument,
                },
            });
        }));
        this.deleteOne = (Model, message) => (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleteDocument = yield Model.findByIdAndDelete(request.params.id);
            if (!deleteDocument) {
                return next(new appError_1.default('No documment found with that ID', 404));
            }
            response.status(204).json({
                status: "success",
                message,
                data: null
            });
        }));
    }
}
exports.default = FactoryService;
//# sourceMappingURL=factory.service.js.map