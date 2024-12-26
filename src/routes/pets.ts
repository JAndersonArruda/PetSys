import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';


export interface Pets {
    id: string,
    name: string,
    type: string,
    description: string,
    vaccinated: boolean,
    deadline_vaccination: Date,
    created_at: Date
}

const pets: Pets[] = [];

export default function configurePetRoutes(router: Router) {
    router.get('/pets', (req: Request, res: Response) => {
        res.status(200).send(pets);
    });

    router.get('/pets/:id', (req: Request, res: Response, next: NextFunction) => {
        const id  = req.params.id;
        const pet = pets.find((pet) => pet.id === id);

        if (!pet) {
            res.status(400).json({ error: "pet not found" });
            return;
        }

        res.status(200).send(pet);
    });
}
