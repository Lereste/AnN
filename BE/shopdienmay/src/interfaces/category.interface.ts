import { Schema, model, Document } from 'mongoose';
export interface ICategory {
    title: string;
    products: Schema.Types.ObjectId[]; // Array of ObjectIds
}