import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { pets, petshops } from './store';


export interface Pets {
    id: string,
    name: string,
    type: string,
    description: string,
    vaccinated: boolean,
    deadline_vaccination: Date,
    created_at: Date
}

export default function configurePetRoutes(router: Router) {
    router.get('/pets', (req: Request, res: Response) => {
        res.status(200).send(pets);
    });

    router.get('/pets/:id', (req: Request, res: Response) => {
        const id  = req.params.id;
        const pet = pets.find((pet) => pet.id === id);

        if (!pet) {
            res.status(400).json({ error: "pet not found" });
            return;
        }

        res.status(200).send(pet);
    });

    router.post('/pets', (req: Request, res: Response) => {
        const data = req.body as Pets;
        const cnpjPetshop = req.headers['cnpj'];
        
        if(!cnpjPetshop) {
            res.status(400).json({ error: "Missing required header 'cnpj'" });
            return;
        }

        const petshop = petshops.find((petshop) => petshop.cnpj === cnpjPetshop);

        if(!petshop) {
            res.status(400).json({ error: "Petshop not found" });
            return;
        }

        const newPet: Pets = {
            id: uuidv4(),
            name: data.name,
            type: data.type,
            description: data.description,
            vaccinated: data.vaccinated,
            deadline_vaccination: data.deadline_vaccination,
            created_at: new Date()
        }
        
        if(!newPet) {
            res.status(500).json({ error: "Failed to create pet" });
            return;
        }     

        petshop.pets.push(newPet);
        res.status(201).send(newPet);
    });
}
