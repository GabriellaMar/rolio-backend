import { Request, Response, NextFunction } from "express";
import express, { Express } from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';
// import * as nanoid from 'nanoid';
import { nanoid } from "nanoid";

import cors from 'cors';
import productsRouter from "./routes/products-router";
import basketRouter from "./routes/basket-routes";
import ordersRouter from "./routes/order-routes";
// -----SESSION ID -----------
// const sessionSecretKey = nanoid(32);

const app: Express = express();
// app.use(cors());
app.use(cors({
  // origin: 'http://localhost:5173',
  // origin: 'https://gabriellamar.github.io',
  // credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ---SESSION MIDDLEWARE-----

// app.get('/', (req, res)=>{
//   console.log(req.cookies)
// res.cookie('sky', 'blue', {httpOnly: true})
// res.send('Hallo world')
// })
// app.use(session({
//   secret: 'secret-key-cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: false, // Встановлюйте httpOnly на false, щоб куки були доступні з клієнта
//     path: '/',
//   },
// }));

// app.use((req: Request, res: Response, next: NextFunction) => {
//   const sessionId = req.session.id;
//   console.log("SES:::", sessionId)
//   res.cookie('session', sessionId, { httpOnly: false, path: '/' }); 
//   const ses = req.cookies.session
//   console.log("COOKIE:::", ses)
//   next();
// });
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const sessionIdCookie = req.cookies.session;
//   const currentSessionId = req.session.id;

//   if (!sessionIdCookie || sessionIdCookie !== currentSessionId) { 
//     console.log("Updating session ID in cookie...");
//     res.cookie('session', currentSessionId, { httpOnly: true });
//   }
//   next();
// });
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("!!!!:", req.cookies.session)

//   if (!req.cookies.session) { 
//     const sessionId = req.sessionID;
//     console.log("Updating session ID in cookie...", sessionId);
//     res.cookie('session', sessionId, { httpOnly: true });
//   }
//   next();
// });


app.use('/products', productsRouter);
app.use('/basket', basketRouter);
// app.use('public', express.static('images'));
app.use('/orders', ordersRouter);
app.use('/images', express.static('public/images'));




app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' })
  })
  
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Server error' } = err ;
    res.status(status).json({ message })
  })

export default app;

// app.get('/', (req: Request, res: Response) => {
//   const sessionId = req.session.id;
//   console.log("SES:::", sessionId)
//   res.cookie('session', sessionId, { httpOnly: true }); // Записати ідентифікатор сесії в куку
//   res.send('Hello world');
// });

// Роут для головної сторінки
// app.get('/', (req: Request, res: Response) => {
//   // Отримати ідентифікатор сесії, що зберігається в об'єкті сесії

//   const sessionId = req.session.id;
//   console.log("!!!!",sessionId)
//   // Записати ідентифікатор сесії в куку з іменем 'session'
//   res.cookie('session', sessionId, { httpOnly: true });
//   res.send('Hello world');
// });
// --genetate SESSIONID------
// app.use((req: Request, res: Response, next: NextFunction) => {
//   if (!req.session.id) {
//     // req.session.id = 'fgdgbhngfyufsdfetgzfs';
//     res.cookie('sessionId', req.session.id, { maxAge: 3600000, httpOnly: true });
//   }
//   next();
// });