import { Schema } from 'mongoose';
export interface IProduct {
    name: string;
    description: string;
    image: string;
    imageList: string[];
    category: Schema.Types.ObjectId;
    price: number;
    sale_price: number;
}