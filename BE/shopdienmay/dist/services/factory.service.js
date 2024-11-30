"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appError_1 = tslib_1.__importDefault(require("../utils/appError"));
const catchAsync_1 = require("../utils/catchAsync");
const apiFeatures_service_1 = tslib_1.__importDefault(require("./apiFeatures.service"));
class FactoryService {
    constructor() {
        this.getAll = (Model) => (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            /*
                const reviewRouter = express.Router({mergeParams: true});
                Vì đã có mergeParams ở router, nên nếu ta call /tours/3123asd535(tourId)/review thì nó sẽ chạy getAll thay vì getOneTour theo id
            */
            // To allow for nested GET reviews on Tour
            let filter = {};
            if (request.params.productId) {
                filter = { product: request.params.productId };
                // console.log('filter', filter); // filter { tour: '5c88fa8cf4afda39709c2955' }
            }
            console.log('filter', filter);
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
                results: documents.length,
                data: {
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
                data: {
                    data: getOneDocument,
                },
            });
        }));
        this.createOne = (Model, message) => (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const newTour = new Tour({});
            // newTour.save();
            // console.log('[FactoryService] - Create: ', request.body);
            const newDocument = yield Model.create(request.body);
            response.status(201).json({
                status: 'success',
                message,
                data: {
                    data: newDocument
                }
            });
        }));
        this.updateOne = (Model, message) => (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedDocument = yield Model.findByIdAndUpdate(request.params.id, request.body, {
                new: true, // Return the modified document rather than the original
                runValidators: true, // Validate the updated data against the model's schema
            });
            console.log(updatedDocument);
            if (!updatedDocument) {
                return next(new appError_1.default('No document found with that ID', 404));
            }
            // await updatedDocument.save();
            updatedDocument.changedAt = Date.now() - 1000; // Add a custom field to track when the review was last changed
            updatedDocument.save();
            response.status(200).json({
                status: "success",
                message,
                data: {
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