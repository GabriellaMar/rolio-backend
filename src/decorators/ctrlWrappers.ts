
import {  MiddlewareFn } from "../types/middleware";

   

    const ctrlWrapper = (ctrl: MiddlewareFn) => {
        const func: MiddlewareFn = async (req, res, next) => {
            try {
                await ctrl(req, res, next);
            } catch (error) {
                next(error);
            }
        };
    
        return func;
    };
    
    export default ctrlWrapper;


 