import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import verifyPetshopById from '../utils/middlewares/verifyPetshopById';
import verifyPetshopBoryData from '../utils/middlewares/verifyPetshopBoryData';

import { petshops } from './store';

import { Pets } from './pets';

export interface PetShop {
    id: string,
    name: string,
    cnpj: string,
    pets: Pets[]
}

export default function configurePetShopsRoutes(router: Router) {
    router.get('/petshops', (req: Request, res: Response) => {
        res.status(200).send(petshops);
    });
    
    router.get('/petshops/:id', verifyPetshopById, (req: Request, res: Response) => {
        const petshop = req.petshop;    
        res.status(200).send(petshop);
    });

    router.post('/petshops', verifyPetshopBoryData, (req: Request, res: Response) => {
        const data = req.data! as PetShop;

        if (petshops.find(petshop => petshop.cnpj === data.cnpj)) {
            res.status(400).json({ error: "CNPJ already registered" });
            return;
        }

        const newPetshop: PetShop = {
            id: uuidv4(),
            name: data.name,
            cnpj: data.cnpj,
            pets: []
        };

        if(!newPetshop) {
            res.status(500).json({ error: "Failed to create petshop" });
            return;
        }

        petshops.push(newPetshop);
        res.status(201).send(newPetshop);
    });

    router.put('/petshops/:id', verifyPetshopById, verifyPetshopBoryData, (req: Request, res: Response) => {
        const data = req.data!;
        const petshop = req.petshop!;

        if (data.cnpj) {
            res.status(400).json({ error: "Field 'cnpj' cannot be updated" })
            return;
        }

        if (data.name) petshop.name = data.name;
        res.status(200).json({ message: "Update successful" });
    });

    router.delete('/petshops/:id', verifyPetshopById, (req: Request, res: Response) => {
        const id = req.params.id;

        petshops.splice(petshops.findIndex(petshop => petshop.id === id), 1);
        res.status(200).json({ message: "Petshop deleted successfully" });
    });
}