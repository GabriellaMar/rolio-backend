// import { Response, Request } from "express"
import { IProduct } from "../types/products";
import ctrlWrapper from "../decorators/ctrlWrappers";
import { MiddlewareFn } from "../types/middleware";
import { nanoid } from "nanoid";
import * as fs from 'fs/promises'
import path from "path";
import HttpError from "../helpers/HTTPErrors";
import Product from "../models/product-model/Product";


const imagePath = path.resolve("public", "images")


const getAllProducts: MiddlewareFn = async (req, res) => {
    // const sessionId = req.session.id;
    // console.log("!!!!",sessionId)
    // if (sessionId) {
    //     res.cookie('session', sessionId, { httpOnly: true });
    // }
        const products: IProduct[] = await Product.find();

        if(!products){
            throw HttpError(404, 'No products found'); 
        }
        res.status(200).json(products)
}


  const getProductById: MiddlewareFn = async (req, res) => {

    const { id: _id } = req.params;
    const product = await Product.findById({ _id});

    if (!product) {
        throw HttpError(404, "The product is not found");
    }

    res.status(200).json(product);
}

const addProduct: MiddlewareFn = async (req, res) => {
    // const sessionId = nanoid(10)
    // //    session[sessionId]   = {userId: 1,}
    // res.set('Set-cookie', `session = ${sessionId}`)

    if (!req.file) {
        throw HttpError(400, 'No file uploaded');
    }

    const { path: oldPath, filename } = req.file;
     const {title, description, details, price} = req.body;
    const newPath = path.join(imagePath, filename);
    await fs.rename(oldPath, newPath);
    const productURL = path.join("images", filename);
  
    const newProduct = {
        title: title,
        description: description,
        details: details,
        img:  productURL.replace(/\\/g, "/"),
        price: price,
    } as IProduct

    const result = await Product.create({ ...newProduct });

    res.status(201).json(result);
}


const removeProduct: MiddlewareFn = async (req, res) => {

    const { id: _id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ _id}); 

    if (!deletedProduct) {
        throw HttpError(404, "Product not found"); 
    }

    res.status(200).json({
        message: "This product deleted successfully."
    });

}


const updateProductById: MiddlewareFn = async (req, res) => {

    const { id: _id } = req.params;
    const body = req.body;

    let productItem = await Product.findOne({ _id });

    if (!productItem) {
        throw HttpError(404, "There is no product in a product list");
    }

    const result = await Product.findByIdAndUpdate(_id,  body, { new: true });

    res.status(200).json(result);
}



export default {
    getAllProducts: ctrlWrapper(getAllProducts),
    getProductById: ctrlWrapper(getProductById),
    addProduct: ctrlWrapper(addProduct),
    removeProduct: ctrlWrapper(removeProduct),
    updateProductById: ctrlWrapper(updateProductById),

}

