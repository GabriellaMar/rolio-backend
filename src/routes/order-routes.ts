import { Router } from "express";
import validateBodyWrapper from "../decorators/validateBodyWrapper";
import { orderJoiSchema } from "../schemas/order-schemas";
import orderController from "../controllers/order-controllers";
import isValidId from "../middlewares/isValidId";

const ordersRouter: Router = Router();


const orderValidate = validateBodyWrapper(orderJoiSchema);


ordersRouter.get('/', orderController.getAllOrders);

ordersRouter.post('/', orderValidate, orderController.addOrder);

ordersRouter.patch('/:id', isValidId, orderController.updateOrderById);

ordersRouter.delete('/:id',isValidId, orderController.removeOrder);

ordersRouter.delete('/', orderController.resetOrder);


export default ordersRouter