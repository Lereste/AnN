"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'A Product must have a name'],
        trim: true,
        unique: true, // MongoServerError: E11000 duplicate key error collection: xxxDATABASE-NAME.products
        minlength: [10, 'A product name must have more or equal then 10 characters'],
        maxlength: [50, 'A product name must have less or equal than 50 characters'],
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
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
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
        set: (val) => Math.round(val * 10) / 10 // 4.6666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
        type: Number,
        default: 0
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
// // Documment middleware: only runs before .save() and .create() - not for UPDATE
// ProductSchema.pre('save', function (next) {
//   // this: mongoose.Document
//   this.slug = convert(this.name as string, {
//     dictionary: {
//       đ: 'd',
//       Đ: 'D',
//     },
//   })
//   next();
// })
ProductSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});
const ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map