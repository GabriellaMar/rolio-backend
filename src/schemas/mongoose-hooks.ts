import { NextFunction } from "express";

// import { IProduct } from "../types/products";



export const handleMongooseError = (error: any, next: NextFunction): void => {
    
    if (error) {
      
        const { name, code } = error;
        error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    }
    next(error);
};

export const runValidateAtUpdate = function (this: any, next: NextFunction) {
    this.options.runValidators = true;
    next();
};

// export const handleSaveError = (error, data, next) => {
  
//     const { name, code } = error;
//     error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
//     next();
//   }
  
//   export const runValidateAtUpdate = function (next) {
//     this.options.runValidator = true;
//     next();
//   }