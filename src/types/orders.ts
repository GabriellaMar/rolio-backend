import { IBasket } from "./basket";

export interface IOrder extends Document {
    // id: string,
    userName: string,
    phone: string
    products: IBasket[],
    deliveryMethod: string,
    deliveryAddress: object,
    // totalPrice: number,
    
}