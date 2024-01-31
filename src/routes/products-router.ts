import { Router } from "express";
import productsController from "../controllers/product-controllers";

const productsRouter: Router = Router();


productsRouter.get("/", productsController.getAllProducts);

productsRouter.post('/',  productsController.addProduct);

export default productsRouter

