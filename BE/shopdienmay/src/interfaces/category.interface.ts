import { Schema, model, Document } from 'mongoose';
export interface ICategory {
    title: string;
    products: Schema.Types.ObjectId[]; // Array of ObjectIds
}

// export interface IFile{
//     name: string;
//     image: string;
//     data: any;
//     size: number;
//     type: string;
// }