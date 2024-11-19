import { Schema } from 'mongoose';

export interface IReview {
    review: string;
    rating: number // Array of ObjectIds
    createdAt: Date,
    changedAt: Date,
    product: Schema.Types.ObjectId; 
    user: Schema.Types.ObjectId[];
}