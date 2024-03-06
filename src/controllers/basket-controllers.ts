
import { Request, Response  } from "express";
import ctrlWrapper from "../decorators/ctrlWrappers";
import HttpError from "../helpers/HTTPErrors";
import Basket from "../models/basket-model/Basket";
import Product from "../models/product-model/Product";
import { IBasket } from "../types/basket";
import { MiddlewareFn, MiddlewareFnWithAction } from "../types/middleware";
import updateCtrlWrapper from "../decorators/updateCtrlWrapper";




const getAllBasketItem: MiddlewareFn = async(req, res)=>{
    const sessionId = req.session.id;
    console.log("SESSION ID:", sessionId)
    const items: IBasket[] = await Basket.find({sessionId})

    if(items.length=== 0){
        throw HttpError(404, "There are no products in the basket");
    }

    res.status(200).json(items)
}


const addBasketItem: MiddlewareFn = async (req, res) => {

    const { _id, quantity } = req.body;
    const sessionId = req.session.id;
//    console.log("SESSION ID:", sessionId)

    // if (!productId || !quantity) { 
    //     throw HttpError(400, "Missing productId or quantity in the request body.");
    // }

    const product = await Product.findById(_id);

    if (!product) {
        throw HttpError(404, "Product not found.");
    }

    let basketItem = await Basket.findOne({ _id});

    if (!basketItem) {
        basketItem = await Basket.create({
                 _id,
                title: product.title,
                img: product.img,
                price: product.price,
                quantity,
                 sessionId: sessionId,
        });
    } else {
        basketItem.quantity += 1;
        await basketItem.save();
    }

    res.status(201).json(basketItem);
};



const removeBasketItem: MiddlewareFn = async (req, res) => {
    const sessionId = req.session.id;
    console.log(" ID:", sessionId)
    const { id: _id } = req.params;


    const deletedBasketItem = await Basket.findOneAndDelete({ _id}); 

    if (!deletedBasketItem) {
        throw HttpError(404, "Basket product not found"); 
    }

    res.status(200).json({
        _id: deletedBasketItem._id,
        message: "Basket product deleted successfully."
    });
};


const clearBasket: MiddlewareFn = async (req, res) => {
  
    await Basket.deleteMany({}); 

        res.status(200).json({
            message: "Basket cleared successfully" 
         });
};

// const updateBasketItem: MiddlewareFn = async (req,res) =>{
//     const { productId } = req.params; 
//     const body = req.body
//     let basketItem = await Basket.findOne( { productId } );


//    if(!basketItem){
//     throw HttpError(404,  "Basket product is not in the basket");
//    }

//     let newQuantity = basketItem.quantity;
   
//     if (body.action === 'increment') {
//         newQuantity += 1;
//     } else if (body.action === 'decrement' && newQuantity > 0) {
//         newQuantity -= 1;
//     }


// const newBody = {
//     ...basketItem,
//     quantity: newQuantity
//     };

//    console.log(productId);

// const result = await Basket.findByIdAndUpdate(productId,  newBody, { new: true });

//     res.status(200).json(result);
// }

const updateBasketItem  = async (req: Request, res: Response) => {
    const { action, id: _id } = req.params;
    const body = req.body;

    let basketItem = await Basket.findOne({ _id });

    if (!basketItem) {
        throw HttpError(404, "Basket product is not in the basket");
    }

    let newQuantity = basketItem.quantity;

     if (action === 'increment' ) {
        newQuantity += 1;
    }

    if (action === 'decrement' && newQuantity > 0) {
        newQuantity -= 1;
    } 
    // const updatedQuantity = { quantity: newQuantity }; 
    const updatedQuantity = { 
         ...body,
        quantity: newQuantity }

    const result = await Basket.findByIdAndUpdate(_id,  updatedQuantity, { new: true });

    res.status(200).json(result);
}

// const incrementBasketItem = (req: Request, res: Response) =>
//     updateBasketItem(req, res, 'increment');

// const decrementBasketItem = (req: Request, res: Response) =>
//     updateBasketItem(req, res, 'decrement');

export default {
    addBasketItem: ctrlWrapper(addBasketItem),
    getAllBasketItem: ctrlWrapper(getAllBasketItem),
    removeBasketItem: ctrlWrapper(removeBasketItem),
    // incrementBasketItem: ctrlWrapper(incrementBasketItem),
    // decrementBasketItem: ctrlWrapper(decrementBasketItem),
    updateBasketItem: ctrlWrapper(updateBasketItem), 
    clearBasket: ctrlWrapper(clearBasket)
}




// const addBasketItem: MiddlewareFn = async (req, res) => {
//     console.log(req)
//     const { productId, quantity } = req.body;

//      console.log(productId)
   
//     if (!productId) {
//         throw HttpError(400, "Missing productId in the request body.");
//     }

//     const product = await Product.findById(productId);
   
//     if (!product) {
//         throw HttpError(404, "Product not found.");
//     }

//     let basketItem = await Basket.findOne( { product: productId } );

//     if (!basketItem) {
//         basketItem = await Basket.create({
//             product,
//             quantity,
           
//         });
//     } else {
//         basketItem.quantity += 1;
//         await basketItem.save();
//     }

//     res.status(201).json(basketItem);
// };



// const addBasketItem: MiddlewareFn = async (req, res) => {

//     const { productId, quantity } = req.body;

   

//     if (!productId || !quantity) { // Додайте перевірку на наявність обох параметрів
//         throw HttpError(400, "Missing productId or quantity in the request body.");
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//         throw HttpError(404, "Product not found.");
//     }

//         let basketItem = await Basket.findOne( { product: productId } );

//     if (!basketItem) {
//         basketItem = await Basket.create({
//             product: productId,
//             quantity,
           
//         });
//     } else {
//         basketItem.quantity += 1;
//         await basketItem.save();
//     }

//     res.status(201).json(basketItem);
// };

// const addBasketItem: MiddlewareFn = async (req, res) => {

// const { productId, quantity } = req.body;
  
// if (!productId) {
//     throw HttpError(400, "Missing productId in the request body.");
// }

// const product = await Product.findById(productId);
//     if (!product) {
//         throw HttpError(404, "Product not found.");
//     }


//     let basketItem = await Basket.findOne({ productId });

//     // const totalPrice = product.price * quantity;

//     if (!basketItem) {
      
//         basketItem = await Basket.create({
//             productId,
//             product,
//             quantity,
          
//         });
//     } else {
//         basketItem.quantity += 1;
//          await basketItem.save();
//     }
   
//     res.status(201).json(basketItem);
// }


// const addBasketItem: MiddlewareFn = async (req, res) => {
//     const { productId, quantity } = req.body;
   

//     if (!productId) {
//         throw HttpError(400, "Missing productId in the request body.");
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//         throw HttpError(404, "Product not found.");
//     }

//     let basketItem = await Basket.findOne( productId );

//     if (!basketItem) {
//         basketItem = await Basket.create({
//             // product: product, 
//             quantity,
//         });
//     } else {
//         basketItem.quantity += 1;
//         await basketItem.save();
//     }

//     res.status(201).json(basketItem);
// };