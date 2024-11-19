import mongoose, { Query, Schema, model } from 'mongoose'
import { IReview } from '../interfaces/review.interface'

export interface IReviewModel extends IReview, Document {}

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
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product', // product model
    required: [true, 'Review must belong to a Product'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // user model
    required: [true, 'Review must belong to a User'],
  },
})

// prevent duplicate reviews
ReviewSchema.index({ tour: 1, user: 1 }, { unique: true })

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
        // select: '-__v -passwordChangedAt'
        select: 'name id'
    });

    next();
});

const ReviewModel = model<IReviewModel>('Review', ReviewSchema)
export default ReviewModel
