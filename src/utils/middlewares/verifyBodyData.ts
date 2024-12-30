import { NextFunction, Request, Response } from "express";

const verifyBodyData = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    next();
}

export default verifyBodyData;