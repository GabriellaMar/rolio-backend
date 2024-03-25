

export interface IBasket extends Document {
    userId: string;
    id: string;
    title: string;
    img: string;
    price: number;
    quantity: number;
}