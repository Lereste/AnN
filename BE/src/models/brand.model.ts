import { Schema, model } from 'mongoose';

export interface IBrand {
  name: string;
  description?: string;
  logo: string;
}

export interface IBrandModel extends IBrand, Document {}

const BrandSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'A brand must have a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'A brand name must have less or equal than 50 characters'],
    minlength: [2, 'A brand name must have more or equal than 2 characters'],
  },
  description: {
    type: String,
  },
  logo: {
    type: String,
    required: [true, 'A brand must have a logo'],
  },
});

BrandSchema.set('toJSON', {
  virtuals: true, // create: key id
  versionKey: false, // delete key: _v
  transform: function (doc, ret: Record<string, any>) {
    ret.id = ret._id;
    delete ret._id; // delete key: _id
  },
});

BrandSchema.virtual('products', {
    ref: 'Product',
    foreignField: 'brandId', // The field in the Product model that references Category
    localField: '_id', // The field in the Category model that you want to match against
  })

const BrandModel = model<IBrandModel>('Brand', BrandSchema);
export default BrandModel;
