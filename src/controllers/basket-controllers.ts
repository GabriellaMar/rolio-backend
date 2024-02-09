import ctrlWrapper from "../decorators/ctrlWrappers";
import HttpError from "../helpers/HTTPErrors";
import Basket from "../models/basket";
import Product from "../models/product";
import { MiddlewareFn } from "../types/middleware";






const addBasketItem: MiddlewareFn = async (req, res) => {

const { productId, quantity } = req.body;
  
if (!productId) {
    throw HttpError(400, "Missing productId in the request body.");
}

const product = await Product.findById(productId);
    if (!product) {
        throw HttpError(404, "Product not found.");
    }


    let basketItem = await Basket.findOne({ productId });

    const totalPrice = product.price * quantity;
    if (!basketItem) {
      
        basketItem = await Basket.create({
            productId,
            quantity,
            totalPrice: totalPrice,
        });
    } else {
        basketItem.quantity += 1;
        basketItem.totalPrice = product.price * basketItem.quantity;
         await basketItem.save();
    }
   

    // const basketItem = await Basket.create({
    //     productId,
    //     quantity,
    //     totalPrice: totalPrice, 
    // });

    res.status(201).json(basketItem);
}

export default {
    addBasketItem: ctrlWrapper(addBasketItem),
}