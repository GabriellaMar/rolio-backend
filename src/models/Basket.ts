import { model, Schema } from "mongoose";
import {IBasket} from "../types/basket";
// import { handleMongooseError, runValidateAtUpdate } from "../schemas/mongoose-hooks";


 const basketSchema: Schema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
      },
      
},  {versionKey: false, timestamps: true})


// productSchema.post("save", handleMongooseError);
// productSchema.pre('findOneAndUpdate', runValidateAtUpdate);
// productSchema.post('findOneAndUpdate', handleMongooseError);

export default model<IBasket>("Basket", basketSchema);