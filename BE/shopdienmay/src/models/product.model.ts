import { Schema, model } from "mongoose";
import { IProduct } from "src/interfaces/product.interface";
import { IUser } from "src/interfaces/user.interface";
import validator from 'validator';

export interface IProductModel extends IProduct, Document { }

const ProductSchema: Schema = new Schema({
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
},
    // Cách 1: để thẳng vào trong đây
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // }
)

// Cách 2: 
ProductSchema.set('toJSON', {
    virtuals: true, // create: key id
    versionKey: false, // delete key: _v
    transform: function (doc, ret: Record<string, any>) {
        ret.id = ret._id;
        delete ret._id // delete key: _id
    }
})

const ProductModel = model<IProductModel>('Product', ProductSchema);
export default ProductModel;