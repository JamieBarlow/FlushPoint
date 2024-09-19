import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const errObj = new AppError(err.message || "Server Error", statusCode);
  res.json({
    message: errObj.message,
    statusCode: errObj.status,
    stack: process.env.NODE_ENV === "production" ? null : errObj.stack,
  });
};

export default errorHandler;
