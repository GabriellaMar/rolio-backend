import ctrlWrapper from "../decorators/ctrlWrappers";
import HttpError from "../helpers/HTTPErrors";
import Review from "../models/review-model/Review";
import { MiddlewareFn } from "../types/middleware";
import { IReview } from "../types/review";


const getAllReviews: MiddlewareFn = async(req, res)=>{
    const reviews: IReview[] = await Review.find();
    if(!reviews){
        throw HttpError(404, 'No products found'); 
    }
    res.status(200).json(reviews)
  };


  const addReview:  MiddlewareFn = async (req, res) => {
    const { userName, comment  } = req.body;
    const review = await Review.create({
        userName,
        comment,
    });
    res.status(200).json(review)
  };


  const removeReview: MiddlewareFn = async (req, res) => {
   
    const { id: _id } = req.params;

    const deletedOrder = await Review.findOneAndDelete({ _id}); 

    if (!deletedOrder) {
        throw HttpError(404, " An Order not found"); 
    }

    res.status(200).json({
        message: "An Order deleted successfully."
    });
};

const updateReviewById: MiddlewareFn = async(req, res)=>{
    const body = req.body
    const {  id: _id } = req.params;
    const result = await Review.findByIdAndUpdate(_id, body, { new: true });
    if (!result) {
        throw HttpError(400, "Order is not found");
    }
    res.status(200).json(result);
}

const resetReview: MiddlewareFn = async (req, res) => {
    await Review.deleteMany({}); 
        res.status(200).json({
            message: "Your review cleared successfully" 
         });
};

export default {
    getAllReviews: ctrlWrapper(getAllReviews),
    addReview:ctrlWrapper(addReview),
    resetReview: ctrlWrapper(resetReview),
    updateReviewById: ctrlWrapper(updateReviewById),
    removeReview: ctrlWrapper(removeReview),

}