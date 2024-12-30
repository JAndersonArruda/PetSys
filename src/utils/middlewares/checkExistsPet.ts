import { NextFunction, Request, Response } from "express";

const checkExistsPet = (req: Request, res: Response, next: NextFunction) => {
    if (req.petshop!.pets.length !== 0) {
        res.status(400).json({ error: "Cannot delete petshop with pets" });
        return;
    }

    next();
}

export default checkExistsPet;