"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'A category must have a name'],
        maxlength: [50, 'A category name must have less or equal than 50 characters'],
        minlength: [10, 'A category name must have more or equal then 10 characters'],
    },
    // Cách 1: Để products trong đây (line 37)
    // products: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product', // Array of references to products
    //   },
    // ],
});
CategorySchema.set('toJSON', {
    virtuals: true, // create: key id
    versionKey: false, // delete key: _v
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id; // delete key: _id
    },
});
// Cách 2: Dùng virtual (line 18)
// Get Products By categoryId: localhost:4321/api/v1/categories/categoryId
CategorySchema.virtual('products', {
    ref: 'Product',
    foreignField: 'categoryId', // The field in the Product model that references Category
    localField: '_id', // The field in the Category model that you want to match against
});
const CategoryModel = (0, mongoose_1.model)('Category', CategorySchema);
exports.default = CategoryModel;
//# sourceMappingURL=category.model.js.map