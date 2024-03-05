// import { Response, Request } from "express"
import { IProduct } from "../types/products";
import ctrlWrapper from "../decorators/ctrlWrappers";
import { MiddlewareFn } from "../types/middleware";
import { nanoid } from "nanoid";
import * as fs from 'fs/promises'

import path from "path";
import HttpError from "../helpers/HTTPErrors";
import Product from "../models/product-model/Product";



// const BASE_URL_BACK: string | undefined = process.env.BASE_URL_BACK 

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


export default {
    getAllProducts: ctrlWrapper(getAllProducts),
    addProduct: ctrlWrapper(addProduct),
}



// img: req.file ? req.file.path : '',