import { Request, Response, NextFunction } from "express";


export type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;

export type MiddlewareFnWithAction = (req: Request, res: Response, action: string, next: NextFunction) => void;