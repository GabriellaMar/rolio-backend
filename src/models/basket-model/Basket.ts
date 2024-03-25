import { model, Schema } from "mongoose";
import { IBasket } from "../../types/basket";



const basketSchema: Schema = new Schema({
  userId: { type: String },
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  title: {
    type: String
  },
  img: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
}, { versionKey: false, timestamps: true });

export default model<IBasket>("basket", basketSchema);

