import { NextFunction, Request, Response } from "express";

const verifyPetById = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const pet = req.petshop!.pets.find(pet => pet.id === id);

    if (!pet) {
        res.status(400).json({ error: "pet not found" });
        return;
    }

    req.pet = pet;
    next();
}

export default verifyPetById;