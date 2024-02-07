// import { Response, Request } from "express"
import { IProduct } from "../types/products";
import Product from "../models/Product"


import ctrlWrapper from "../decorators/ctrlWrappers";
import { MiddlewareFn } from "../types/middleware";
import * as fs from 'fs/promises'

import path from "path";
import HttpError from "../helpers/HTTPErrors";

// const BASE_URL_BACK: string | undefined = process.env.BASE_URL_BACK 

const imagePath = path.resolve("public", "images")



const getAllProducts: MiddlewareFn = async (req, res) => {
    try {
        const products: IProduct[] = await Product.find()
        res.status(200).json(products)
    } catch (error) {

    }
}


const add: MiddlewareFn = async (req, res) => {

    if (!req.file) {
        throw HttpError(400, 'No file uploaded');
    }

    const { path: oldPath, filename } = req.file;
    const body = req.body;
    const newPath = path.join(imagePath, filename);
    await fs.rename(oldPath, newPath);
    const productURL = path.join("images", filename);
    const newProduct = {
        title: req.body.title,
        description: req.body.description,
        details: req.body.details,
        img:  productURL.replace(/\\/g, "/"),
        price: req.body.price,
    } as IProduct

    const result = await Product.create({ ...newProduct });

    res.status(201).json(result);
}


export default {
    getAllProducts: ctrlWrapper(getAllProducts),
    addProduct: ctrlWrapper(add),
}



// img: req.file ? req.file.path : '',