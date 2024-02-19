import ctrlWrapper from "../decorators/ctrlWrappers";
import HttpError from "../helpers/HTTPErrors";
import Basket from "../models/basket-model/Basket";
import Product from "../models/product-model/Product";
import { IBasket } from "../types/basket";
import { MiddlewareFn } from "../types/middleware";





const getAllBasketItem: MiddlewareFn = async(req, res)=>{
    const items: IBasket[] = await Basket.find({}, "-_id").populate('product', 'title img price');
 

    if(items.length=== 0){
        throw HttpError(404, "There are no products in the basket");
    }

    res.status(200).json(items)
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



const addBasketItem: MiddlewareFn = async (req, res) => {

    const { productId, quantity } = req.body;

   

    if (!productId || !quantity) { // Додайте перевірку на наявність обох параметрів
        throw HttpError(400, "Missing productId or quantity in the request body.");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw HttpError(404, "Product not found.");
    }

    // Переконайтеся, що створюєте елемент кошика з обома параметрами productId та quantity
    // const basketItem = await Basket.create({
    //     product: product._id,
    //     quantity: quantity,
    // });
        let basketItem = await Basket.findOne( { product: productId } );

    if (!basketItem) {
        basketItem = await Basket.create({
            product: productId,
            quantity,
           
        });
    } else {
        basketItem.quantity += 1;
        await basketItem.save();
    }

    res.status(201).json(basketItem);
};


// const removeBasketItem: MiddlewareFn = async(req, res) =>{
//      const { productId }= req.body;
  
//     console.log(req)
//     const deletedBasketItem = await Basket.findByIdAndDelete(productId);
//     if(!deletedBasketItem){
//         throw HttpError(404, "Basket product not found");
//     }
//     res.status(200).json({
//         message: "Basket product deleted successfully."
//     });


// }

const removeBasketItem: MiddlewareFn = async (req, res) => {
    const { productId } = req.params; // Отримання айді продукту з параметрів шляху

    if (!productId) {
        throw HttpError(400, "Missing productId in the request parameters."); // Перевірка, чи існує productId в параметрах шляху
    }

    const deletedBasketItem = await Basket.findOneAndDelete({ product: productId }); // Пошук та видалення елемента кошика за айді продукту

    if (!deletedBasketItem) {
        throw HttpError(404, "Basket product not found"); // Якщо елемент не знайдено, повертаємо помилку
    }

    res.status(200).json({
        message: "Basket product deleted successfully."
    });
};




export default {
    addBasketItem: ctrlWrapper(addBasketItem),
    getAllBasketItem: ctrlWrapper(getAllBasketItem),
    removeBasketItem: ctrlWrapper(removeBasketItem)
}


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