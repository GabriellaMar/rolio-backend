import { MiddlewareFnWithAction } from "../types/middleware";

const updateCtrlWrapper = (ctrl: MiddlewareFnWithAction) => {
    const func: MiddlewareFnWithAction = async (req, res, action, next) => {
        try {
            await ctrl(req, res, action, next);
        } catch (error) {
            next(error);
        }
    };

    return func;
};

export default updateCtrlWrapper;