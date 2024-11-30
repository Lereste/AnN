import mongoose, { Model, Query, Schema, Types, model } from 'mongoose'
import { IReview } from '../interfaces/review.interface'
import ProductModel from './product.model'

export interface IReviewModel extends IReview, Document {
  // Instance methods will be added here
}

// Define a type for the static methods
export interface IReviewModelStatic extends Model<IReviewModel> {
  calculatorAverageRatings(productId: mongoose.Schema.Types.ObjectId): Promise<void>;
}

const ReviewSchema: Schema = new Schema({
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
    type: mongoose.Schema.ObjectId,
    ref: 'User', // user model
    required: [true, 'Review must belong to a User'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product', // product model
    required: [true, 'Review must belong to a Product'],
  },
})

// prevent duplicate reviews
ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

ReviewSchema.set('toJSON', {
  virtuals: true, // create: key id
  versionKey: false, // delete key: _v
  transform: function (doc, ret: Record<string, any>) {
    ret.id = ret._id
    delete ret._id // delete key: _id
  },
})

ReviewSchema.pre(/^find/, function (this: Query<any, IReviewModel>, next) {
  this.populate({
    path: 'user',
    select: 'id name photo'
  });

  next();
});


ReviewSchema.statics.calculatorAverageRatings = async function (productId) {
  const stats = await this.aggregate([
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
  ])

  console.log('stats', stats);

  if (stats.length > 0) {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    })
  } else {
    // set default rating
    await ProductModel.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    })
  }
}

ReviewSchema.post('save', function () {
  // this points to the current document (Review)

  // Review.calculatorAverageRatings(this.tour); // not work
  (this.constructor as IReviewModelStatic).calculatorAverageRatings(this.product as Schema.Types.ObjectId); // work - this.tour = reviewSchema.tour (id)
});

ReviewSchema.post(/^findOneAnd/, async function (docs) {
  await (docs.constructor as IReviewModelStatic).calculatorAverageRatings(docs.tour);
});


const ReviewModel = model<IReviewModel, IReviewModelStatic>('Review', ReviewSchema)
export default ReviewModel
