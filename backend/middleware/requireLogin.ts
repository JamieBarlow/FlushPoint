import { Request, Response, NextFunction } from "express";

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.status(401).redirect("/users/login");
  }
  next();
};

export default requireLogin;
