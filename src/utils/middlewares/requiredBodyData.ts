import { Request, Response, NextFunction } from "express";

const requiredBodyData = (req: Request, res: Response, next: NextFunction) => {
    const { name, type, description, deadline_vaccination } = req.body;

    if (!name || !type || !description || !deadline_vaccination) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    next();
}

export default requiredBodyData;