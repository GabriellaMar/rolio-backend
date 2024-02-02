import { Router } from "express";
import productsController from "../controllers/product-controllers";
import upload from "../middlewares/upload";

const productsRouter: Router = Router();


productsRouter.get("/", productsController.getAllProducts);

productsRouter.post('/',  upload.single('img'), productsController.addProduct);

export default productsRouter

