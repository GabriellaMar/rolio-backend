import { Router } from "express";
import basketController from "../controllers/basket-controllers";
    import validateBodyWrapper from "../decorators/validateBodyWrapper";
import { basketJoiSchema } from "../schemas/basket-schemas";

const basketRouter: Router = Router();


const basketValidate = validateBodyWrapper(basketJoiSchema);




basketRouter.get('/', basketController.getAllBasketItem);

basketRouter.post('/',  basketValidate, basketController.addBasketItem);


basketRouter.delete('/:productId', basketController.removeBasketItem);
// basketRouter.delete('/', basketController.removeBasketItem);


export default basketRouter