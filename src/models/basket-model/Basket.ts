import { model, Schema } from "mongoose";
import {IBasket} from "../../types/basket";



// const basketSchema: Schema = new Schema({
//   productId: {
//       type: Schema.Types.ObjectId,
//       ref: "Product", 
//       required: true,
//   },
//   quantity: {
//       type: Number,
//       required: true,
//       default: 0,
//   },
//   // totalPrice: {
//   //     type: Number,
//   // },
// }, { versionKey: false, timestamps: true });

// export default model<IBasket>("Basket", basketSchema);


// const basketSchema: Schema = new Schema({
//   product: {
//       type: Schema.Types.ObjectId,
//       ref: "product", 
//       required: true,
//   },
//   quantity: {
//       type: Number,
//       required: true,
//       default: 0,
//   },

// }, { versionKey: false, timestamps: true });

// export default model<IBasket>("basket", basketSchema);

const basketSchema: Schema = new Schema({
  _id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
  },
  sessionId: {
    type: String,
},
  title: String,
  img: String,
  price: Number,
  quantity: {
      type: Number,
      required: true,
      default: 0,
  },
}, { versionKey: false, timestamps: true });

export default model<IBasket>("Basket", basketSchema);



  // totalPrice: {
  //     type: Number,
  //     required: true,
  // },
  // title: {
  //     type: String,
  //     required: true,
  // },
  // img: {
  //     type: String,
  //     required: true,
  // },
  // price: {
  //     type: Number,
  //     required: true,
  // }