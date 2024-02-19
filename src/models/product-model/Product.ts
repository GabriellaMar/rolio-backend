import { model, Schema } from "mongoose";
import {IProduct} from "../../types/products";



 const productSchema: Schema = new Schema({
  
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
      },
      details: {
        type: String,
      },
      img: {
        type: String,
        required: true, 
      },
      price: {
        type: Number,
        required: true, 
        min: 0 ,
      }
},  {versionKey: false, timestamps: true})


// productSchema.post("save", handleMongooseError);
// productSchema.pre('findOneAndUpdate', runValidateAtUpdate);
// productSchema.post('findOneAndUpdate', handleMongooseError);

export default model<IProduct>("product", productSchema);


