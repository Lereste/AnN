import { Query, Schema, model } from 'mongoose'
import { IProduct } from 'src/interfaces/product.interface'
import { IUser } from 'src/interfaces/user.interface'
import convert from 'url-slug'
import validator from 'validator'

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
  {
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
        validator: function (value: number) {
          // "this" only points to current doc on CREATE (NEW) document creation
          return value < this.price // 100 < 200
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
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

// Documment middleware: only runs before .save() and .create() - not for UPDATE
ProductSchema.pre('save', function (next) {
  // console.log('this', this);
  // this: mongoose.Document
  this.slug = convert(this.name as string, {
    dictionary: {
      đ: 'd',
      Đ: 'D',
    },
  })

  next()
})

const ProductModel = model<IProductModel>('Product', ProductSchema)
export default ProductModel
