import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HTTPErrors";
import { MiddlewareFn } from "../types/middleware";

const isValidId: MiddlewareFn = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return next(HttpError(404, `${id} is not valid`))
    }
    next();
}

export default isValidId;