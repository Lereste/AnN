import { Query, Schema, model } from 'mongoose'
import { IProduct } from 'src/interfaces/product.interface'
import { IUser } from 'src/interfaces/user.interface'
import convert from 'url-slug'
import validator from 'validator'

export interface IProductModel extends IProduct, Document { }

const ProductSchema: Schema = new Schema(
  {
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
    brandId: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'A Product must have a brandId'],
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
      required: [true, 'A Product must have a categoryId'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'],
      set: (val: number) => Math.round(val * 10) / 10 // 4.6666, 46.6666, 47, 4.7
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
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
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
    ret.id = ret._id
    delete ret._id // delete key: _id
  },
})

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
})

const ProductModel = model<IProductModel>('Product', ProductSchema)
export default ProductModel
