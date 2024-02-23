import { Router } from "express";

import basketController from "../controllers/basket-controllers";
    import validateBodyWrapper from "../decorators/validateBodyWrapper";
import { basketJoiSchema } from "../schemas/basket-schemas";

const basketRouter: Router = Router();


const basketValidate = validateBodyWrapper(basketJoiSchema);




basketRouter.get('/', basketController.getAllBasketItem);

basketRouter.post('/',  basketValidate, basketController.addBasketItem);


basketRouter.delete('/:id', basketController.removeBasketItem);
basketRouter.patch('/:action/:id', basketController.updateBasketItem)
// basketRouter.patch('/increment/:id', basketController.incrementBasketItem);
// basketRouter.patch('/decrement/:id', basketController.decrementBasketItem);

basketRouter.delete('/', basketController.clearBasket);


export default basketRouter