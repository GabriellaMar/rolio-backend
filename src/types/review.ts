import { Document } from "mongoose";

export interface IReview extends Document {
    id: string,
    userName: string,
    comment: string,
}
