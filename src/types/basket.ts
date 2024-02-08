export interface IBasket extends Document {
    productId: string,
    quantity: number,
     totalPrice: number,
}