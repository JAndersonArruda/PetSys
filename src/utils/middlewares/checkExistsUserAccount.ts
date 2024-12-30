import { NextFunction, Request, Response } from "express";
import { petshops } from "../../routes/store";

const checkExistsUserAccount = (req: Request, res: Response, next: NextFunction) => {
    const cnpjUser = req.headers['cnpj'];

    if (!cnpjUser) {
        res.status(400).json({ error: "Missing required header 'cnpj'" });
        return;
    }

    const user = petshops.find(petshop => petshop.cnpj === cnpjUser);

    if (!user) {
        res.status(400).json({ error: "User account not exists" });
        return;
    }

    req.petshop = user;
    next();
}

export default checkExistsUserAccount;