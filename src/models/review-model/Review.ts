import { model, Schema } from "mongoose";
import { IReview } from "../../types/review";

const reviewSchema: Schema = new Schema({
  
  userName: {
        type: String,
        required: true,
    },
      comment: {
        type: String,
        required: [true, "Set comment for review, *(any string)"],
      }
},  {versionKey: false, timestamps: true})


export default model<IReview>("review", reviewSchema);