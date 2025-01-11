"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const product_model_1 = tslib_1.__importDefault(require("./product.model"));
const ReviewSchema = new mongoose_1.Schema({
    review: {
        type: String,
        trim: [true, 'Review can not empty!'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    changedAt: Date,
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'User', // user model
        required: [true, 'Review must belong to a User'],
    },
    product: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'Product', // product model
        required: [true, 'Review must belong to a Product'],
    },
});
// prevent duplicate reviews
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
ReviewSchema.set('toJSON', {
    virtuals: true, // create: key id
    versionKey: false, // delete key: _v
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id; // delete key: _id
    },
});
ReviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'id name photo'
    });
    next();
});
ReviewSchema.statics.calculatorAverageRatings = function (productId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const stats = yield this.aggregate([
            {
                $match: { product: productId } //  $match: { tour: mongoose.Types.ObjectId(tourId) }
            },
            /*
                Q:  Why do you have to group by tour?
                A:  It gets all the reviews, but it doesn't group them together under one result.
                    Without the grouping, you'd just have an array of reviews for that tour.
                    In order to get the average, it needs to be grouped.
            */
            {
                $group: {
                    _id: "$product",
                    nRating: { $sum: 1 },
                    avgRating: { $avg: "$rating" }
                }
            }
        ]);
        console.log('stats', stats);
        if (stats.length > 0) {
            yield product_model_1.default.findByIdAndUpdate(productId, {
                ratingsQuantity: stats[0].nRating,
                ratingsAverage: stats[0].avgRating
            });
        }
        else {
            // set default rating
            yield product_model_1.default.findByIdAndUpdate(productId, {
                ratingsQuantity: 0,
                ratingsAverage: 4.5
            });
        }
    });
};
ReviewSchema.post('save', function () {
    // this points to the current document (Review)
    // Review.calculatorAverageRatings(this.tour); // not work
    this.constructor.calculatorAverageRatings(this.product); // work - this.tour = reviewSchema.tour (id)
});
ReviewSchema.post(/^findOneAnd/, function (docs) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (docs) {
            console.log('docs', docs);
            yield docs.constructor.calculatorAverageRatings(docs.product);
        }
    });
});
const ReviewModel = (0, mongoose_1.model)('Review', ReviewSchema);
exports.default = ReviewModel;
//# sourceMappingURL=review.model.js.map