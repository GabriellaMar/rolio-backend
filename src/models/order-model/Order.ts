import { model, Schema } from "mongoose";
import { IOrder } from "../../types/orders";


const orderSchema: Schema = new Schema({
    // _id: {
    //     type: String
    //     // required: true
    //   },
    userName:
    {
        type: String,
        required: true
    },
    phone:
    {
        type: String,
        required: true
    },
    deliveryMethod:
    {
        type: String,
        required: true
    },
    deliveryAddress:
    {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Basket'
    }],
    // totalPrice: {
    //     type: Number,
    // }

});

export default model<IOrder>('order', orderSchema);