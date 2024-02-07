import ctrlWrapper from "../decorators/ctrlWrappers";
import HttpError from "../helpers/HTTPErrors";
import Basket from "../models/Basket";
import Product from "../models/Product";
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
    const totalPrice = product.price * quantity;

    const basketItem = await Basket.create({
        productId,
        quantity,
        totalPrice: totalPrice, 
    });

    res.status(201).json(basketItem);
}

export default {
    // getAllProducts: ctrlWrapper(getAllProducts),
    addBasketItem: ctrlWrapper(addBasketItem),
}