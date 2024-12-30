import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import checkExistsUserAccount from '../utils/middlewares/checkExistsUserAccount';

import { petshops } from './store';

import verifyPetById from '../utils/middlewares/verifyPetById';
import verifyBodyData from '../utils/middlewares/verifyBodyData';
import requiredBodyData from '../utils/middlewares/requiredBodyData';

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
    router.get('/pets', checkExistsUserAccount, (req: Request, res: Response) => {
        const petshop = req.petshop!;
        res.status(200).send(petshop.pets);
    });

    router.get('/pets/:id', checkExistsUserAccount, verifyPetById, (req: Request, res: Response) => {
        const pet = req.pet!;
        res.status(200).send(pet);
    });

    router.post('/pets', checkExistsUserAccount, verifyBodyData, (req: Request, res: Response) => {
        const petshop = req.petshop!;
        const data = req.body as Pets;

        const newPet: Pets = {
            id: uuidv4(),
            name: data.name,
            type: data.type,
            description: data.description,
            vaccinated: false,
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

    router.put('/pets/:id', checkExistsUserAccount, verifyPetById, requiredBodyData, (req: Request, res: Response) => {
        const pet = req.pet!;
        const data = req.body as Pets;

        pet.name = data.name;
        pet.type = data.type;
        pet.description = data.description;
        pet.deadline_vaccination = data.deadline_vaccination;

        res.status(200).json({ messsage: "Update successfy" });
    });

    router.patch('/pets/:id/vaccinated', checkExistsUserAccount, verifyPetById, (req: Request, res: Response) => {
        const pet = req.pet!;
        pet.vaccinated = true;
        res.status(200).send({ message: "vaccinated successfully" });
    });

    router.delete('/pets/:id', (req: Request, res: Response) => {
        const cnpjPetshop = req.headers['cnpj'];
        if(!cnpjPetshop) {
            res.status(400).json({ error: "Missing required header 'cnpj'" });
            return;
        }

        const petshop = petshops.find(petshop => petshop.cnpj === cnpjPetshop);
        if (!petshop) {
            res.status(400).json({ error: "Petshop not found" });
            return;
        }

        const id = req.params.id;
        const petIndex = petshop.pets.findIndex(pet => pet.id === id);
        if(petIndex === -1) {
            res.status(400).json({ error: "Pet not found" });
            return;
        }

        petshop.pets.splice(petIndex, 1);
        res.status(200).json({ message: "Delete successfy" });
    });
}
