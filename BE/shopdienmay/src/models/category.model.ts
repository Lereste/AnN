import mongoose, { Query, Schema, model } from 'mongoose'
import { ICategory } from '../interfaces/category.interface'
import { IProduct } from 'src/interfaces/product.interface'
import { IUser } from 'src/interfaces/user.interface'
import validator from 'validator'

export interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A category must have a name'],
      maxlength: [50, 'A category name must have less or equal than 50 characters'],
      minlength: [10, 'A category name must have more or equal then 10 characters'],
    },
    productInfo: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Array of references to products
      },
    ],
  },
)

CategorySchema.set('toJSON', {
  virtuals: true, // create: key id
  versionKey: false, // delete key: _v
  transform: function (doc, ret: Record<string, any>) {
    ret.id = ret._id
    delete ret._id // delete key: _id
  },
})

// localhost:4321/api/v1/categories/categoryId
CategorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'categoryId', // The field in the Product model that references Category
  localField: '_id', // The field in the Category model that you want to match against
})



const CategoryModel = model<ICategoryModel>('Category', CategorySchema)
export default CategoryModel
