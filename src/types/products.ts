import { Document } from "mongoose";

export interface IProduct extends Document {
    id: string,
    title: string,
    description: string,
    img: string,
    details: string,
    price: number,
}

