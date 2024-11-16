"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "A Product must have a name"],
        maxlength: [50, 'A product name must have less or equal than 50 characters'],
        minlength: [10, 'A product name must have more or equal then 10 characters'],
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: 'default-product-image.jpeg'
    },
    imageList: [String],
    categories: {
        type: Array,
    },
    price: {
        type: Number,
        required: true
    },
    sale_price: {
        type: Number,
    }
});
// Cách 2: 
ProductSchema.set('toJSON', {
    virtuals: true, // create: key id
    versionKey: false, // delete key: _v
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id; // delete key: _id
    }
});
const ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map