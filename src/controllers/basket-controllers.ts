
import { Request, Response  } from "express";
import ctrlWrapper from "../decorators/ctrlWrappers";
import HttpError from "../helpers/HTTPErrors";
import Basket from "../models/basket-model/Basket";
import Product from "../models/product-model/Product";
import { IBasket } from "../types/basket";
import { MiddlewareFn } from "../types/middleware";
import updateCtrlWrapper from "../decorators/updateCtrlWrapper";




export const getAllBasketItem: MiddlewareFn = async (req, res) => {
    const { userId } = req.query;
    const items: IBasket[] = await Basket.find({ userId });

    if (items.length === 0) {
        throw  HttpError(404, "There are no products in the basket");
    }

    res.status(200).json(items);
};

export const addBasketItem: MiddlewareFn = async (req, res) => {
    const userId = req.query.userId;
    const { _id, quantity } = req.body;

    const product = await Product.findById(_id);

    if (!product) {
        throw  HttpError(404, "Product not found.");
    }

    let basketItem = await Basket.findOne({ _id});

    if (!basketItem) {
        basketItem = await Basket.create({
            _id,
            title: product.title,
            img: product.img,
            price: product.price,
            quantity: quantity,
            userId: userId,
        });
    }
     else {
         basketItem.quantity += quantity;
         await basketItem.save();
    }

    res.status(201).json(basketItem);
};

export const removeBasketItem: MiddlewareFn = async (req, res) => {
   
    const { id: _id } = req.params;

    const deletedBasketItem = await Basket.findOneAndDelete({ _id});

    if (!deletedBasketItem) {
        throw  HttpError(404, "Basket product not found");
    }

    res.status(200).json({
        _id: deletedBasketItem._id,
        message: "Basket product deleted successfully."
    });
};

export const clearBasket: MiddlewareFn = async (req, res) => {
    const { userId } = req.query;

    await Basket.deleteMany({ userId });

    res.status(200).json({
        message: "Basket cleared successfully"
    });
};

export const updateBasketItem: MiddlewareFn = async (req, res) => {
    const { action, id: _id } = req.params;
    const { userId } = req.query;
    const body = req.body;

    let basketItem = await Basket.findOne({ _id, userId });

    if (!basketItem) {
        throw  HttpError(404, "Basket product is not in the basket");
    }

    let newQuantity = basketItem.quantity;

    if (action === 'increment') {
        newQuantity += 1;
    }

    if (action === 'decrement' && newQuantity > 0) {
        newQuantity -= 1;
    }

    const updatedQuantity = {
        ...body,
        quantity: newQuantity
    };

    const result = await Basket.findByIdAndUpdate(_id, updatedQuantity, { new: true });

    res.status(200).json(result);
};



export default {
    addBasketItem: ctrlWrapper(addBasketItem),
    getAllBasketItem: ctrlWrapper(getAllBasketItem),
    removeBasketItem: ctrlWrapper(removeBasketItem),
    updateBasketItem: ctrlWrapper(updateBasketItem), 
    clearBasket: ctrlWrapper(clearBasket)
}

