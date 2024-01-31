import { Response, Request } from "express"
import {IProduct} from "../types/products";
import Product from "../models/product"
import ctrlWrapper from "../decorators/ctrlWrappers";
import { MiddlewareFn } from "../types/middleware";

// const Products: IProduct[] = 

const getAllProducts: MiddlewareFn = async (req, res)  => {
    try {
        const products: IProduct[] = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        
    }
}


const add: MiddlewareFn =  async (req, res) => {
    const newProduct = req.body as IProduct
   
    const result = await Product.create({ ...newProduct });

    res.status(201).json(result);
}


export default {
    getAllProducts: ctrlWrapper(getAllProducts),
    addProduct: ctrlWrapper(add),
}