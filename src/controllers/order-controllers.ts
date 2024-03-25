import ctrlWrapper from "../decorators/ctrlWrappers";
import HttpError from "../helpers/HTTPErrors";
import Basket from "../models/basket-model/Basket";
import Order from "../models/order-model/Order";
import { MiddlewareFn } from "../types/middleware";
import { IOrder } from "../types/orders";

const getAllOrders: MiddlewareFn = async(req, res)=>{
  
    const orders: IOrder[] = await Order.find({}).populate('products', 'title quantity price')

    if(orders.length=== 0){
        throw HttpError(404, "There are no products in the basket");
    }

    res.status(200).json(orders)
}


const addOrder: MiddlewareFn = async(req, res)=>{
    const{ userName, phone, deliveryMethod, deliveryAddress}= req.body

   let basketProducts = await Basket.find();
 
   if (basketProducts.length === 0) {
    throw HttpError(404, "There are no products in the basket");
}

   const order = await Order.create({
        products: basketProducts,
        userName,
        phone,
        deliveryMethod,
        deliveryAddress
    });

    await Basket.deleteMany();

   res.status(201).json(order);
   }

   
const removeOrder: MiddlewareFn = async (req, res) => {
   
    const { id: _id } = req.params;


    const deletedOrder = await Order.findOneAndDelete({ _id}); 

    if (!deletedOrder) {
        throw HttpError(404, " An Order not found"); 
    }

    res.status(200).json({
        _id: deletedOrder._id,
        message: "An Order deleted successfully."
    });
};

const updateOrderById: MiddlewareFn = async(req, res)=>{
    const body = req.body
    const {  id: _id } = req.params;
    const result = await Order.findByIdAndUpdate(_id, body, { new: true });

    if (!result) {
        throw HttpError(400, "Order is not found");
    }
    res.status(200).json(result);
}


   const resetOrder: MiddlewareFn = async (req, res) => {
    await Order.deleteMany({}); 
        res.status(200).json({
            message: "Basket cleared successfully" 
         });
};

  
    




export default {
    getAllOrders: ctrlWrapper(getAllOrders),
    addOrder:ctrlWrapper(addOrder),
    resetOrder: ctrlWrapper(resetOrder),
    updateOrderById: ctrlWrapper(updateOrderById),
    removeOrder: ctrlWrapper(removeOrder),

}