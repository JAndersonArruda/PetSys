import { Request, Response, NextFunction } from "express";
import { petshops } from "../../routes/store";

const verifyPetshopById = (req: Request, res: Response, next: NextFunction) => {
    const id  = req.params.id;
    const petshop = petshops.find((petshop) => petshop.id === id);
    
    if (!petshop) {
        res.status(400).json({ error: "petshop not found" });
        return;
    }

    req.petshop = petshop;
    next();
}

export default verifyPetshopById;