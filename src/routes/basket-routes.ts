import { Router } from "express";
import basketController from "../controllers/basket-controllers";
    import validateBodyWrapper from "../decorators/validateBodyWrapper";
import { basketJoiSchema } from "../schemas/basket-schemas";

const basketRouter: Router = Router();


const basketValidate = validateBodyWrapper(basketJoiSchema);



basketRouter.post('/',  basketValidate, basketController.addBasketItem);


export default basketRouter