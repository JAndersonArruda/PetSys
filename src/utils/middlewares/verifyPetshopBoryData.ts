import { Request, Response, NextFunction } from "express";

const verifyPetshopBoryData = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    req.data = data;
    next();
}

export default verifyPetshopBoryData;