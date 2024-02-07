
import HttpError from "../helpers/HTTPErrors";
import { MiddlewareFn } from "../types/middleware";
import { Schema } from "joi";

const validateBodyWrapper = (schema:  Schema) => {
    const func: MiddlewareFn = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
        next();
    }

    return func;
}

export default validateBodyWrapper;