import { model, Schema } from "mongoose";
import {IBasket} from "../types/basket";



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


export default model<IBasket>("Basket", basketSchema);