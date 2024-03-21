import { Router } from "express";
import productsController from "../controllers/product-controllers";
import upload from "../middlewares/upload";
import isValidId from "../middlewares/isValidId";

const productsRouter: Router = Router();


productsRouter.get("/", productsController.getAllProducts);

productsRouter.get('/:id', isValidId, productsController.getProductById);

productsRouter.post('/',  upload.single('img'), productsController.addProduct);

productsRouter.delete('/:id', isValidId, productsController.removeProduct);

productsRouter.patch('/:id', isValidId, productsController.updateProductById)

export default productsRouter

