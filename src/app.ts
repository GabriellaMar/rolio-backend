import { Request, Response, NextFunction } from "express";
import express, { Express } from "express";

import cors from 'cors';
import productsRouter from "./routes/products-router";
import basketRouter from "./routes/basket-routes";


const app: Express = express();
app.use(cors());
app.use(express.json());


app.use('/products', productsRouter);
app.use('/basket', basketRouter);
// app.use('public', express.static('images'));
app.use('/images', express.static('public/images'));


app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' })
  })
  
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Server error' } = err ;
    res.status(status).json({ message })
  })

export default app;