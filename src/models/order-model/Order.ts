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
        type: Object,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'basket'
    }],
    
}, {versionKey: false, timestamps: true});

export default model<IOrder>('order', orderSchema);