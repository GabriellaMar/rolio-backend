import { IBasket } from "./basket";

export interface IOrder extends Document {
    userName: string,
    phone: string
    products: IBasket[],
    deliveryMethod: string,
    deliveryAddress: object,
    
}