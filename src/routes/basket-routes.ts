import { Router } from "express";

import basketController from "../controllers/basket-controllers";
    import validateBodyWrapper from "../decorators/validateBodyWrapper";
import { basketJoiSchema } from "../schemas/basket-schemas";
import isValidId from "../middlewares/isValidId";

const basketRouter: Router = Router();


const basketValidate = validateBodyWrapper(basketJoiSchema);


basketRouter.get('/', basketController.getAllBasketItem);

basketRouter.post('/',  basketValidate, basketController.addBasketItem);

basketRouter.delete('/:id', isValidId, basketController.removeBasketItem);

basketRouter.patch('/:action/:id', isValidId, basketController.updateBasketItem);

basketRouter.delete('/', basketController.clearBasket);


export default basketRouter