"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const url_slug_1 = tslib_1.__importDefault(require("url-slug"));
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'A Product must have a name'],
        maxlength: [50, 'A product name must have less or equal than 50 characters'],
        minlength: [10, 'A product name must have more or equal then 10 characters'],
    },
    slug: String,
    description: {
        type: String,
    },
    image: {
        type: String,
        default: 'default-product-image.jpeg',
    },
    imageList: [String],
    categoryId: {
        type: String,
        required: [true, 'A Product must have a Category Id'],
    },
    price: {
        type: Number,
        required: true,
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (value) {
                // "this" only points to current doc on CREATE (NEW) document creation
                return value < this.price; // 100 < 200
            },
            message: 'Discount price ({VALUE}) should be below regular price',
        },
    },
});
// Cách 2:
ProductSchema.set('toJSON', {
    virtuals: true, // create: key id
    versionKey: false, // delete key: _v
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id; // delete key: _id
    },
});
// ProductSchema.pre(/^find/, function (next) {
//     const query = this as Query<any, any>
//     query.populate([
//       {
//         path: 'category',
//         // model: 'Product',
//         // select: 'name photo' // Include only the name and photo fields
//       },
//     ])
//     next()
//   })
// Documment middleware: only runs before .save() and .create() - not for UPDATE
ProductSchema.pre('save', function (next) {
    // console.log('this', this);
    // this: mongoose.Document
    this.slug = (0, url_slug_1.default)(this.name, {
        dictionary: {
            đ: 'd',
            Đ: 'D',
        },
    });
    next();
});
ProductSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});
const ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map