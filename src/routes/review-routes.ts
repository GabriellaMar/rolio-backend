import { Router } from "express";
import { reviewJoiSchema } from "../schemas/review-schemas";
import validateBodyWrapper from "../decorators/validateBodyWrapper";
import isValidId from "../middlewares/isValidId";
import reviewController from "../controllers/review-controller";
const reviewRouter: Router = Router();


const reviewValidate = validateBodyWrapper(reviewJoiSchema);


reviewRouter.get('/', reviewController.getAllReviews);

reviewRouter.post('/', reviewValidate, reviewController.addReview);

reviewRouter.patch('/:id', isValidId, reviewController.updateReviewById);

reviewRouter.delete('/:id',isValidId, reviewController.removeReview);

reviewRouter.delete('/', reviewController.resetReview);


export default reviewRouter