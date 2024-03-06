// export interface IBasket extends Document {
//     productId: string,
//     quantity: number,
//     //  totalPrice: number,
// }

export interface IBasket extends Document {
    id: string;
    // sessionId: string;
    title: string;
    img: string;
    price: number;
    quantity: number;
}