import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Pets } from './pets';

interface PetShop {
    id: string,
    name: string,
    cnpj: string,
    pets: Pets[]
}

const petshops: PetShop[] = [];

export default function configurePetShopsRoutes(router: Router) {
    router.get('/petshops', (req: Request, res: Response) => {
        res.status(200).send(petshops);
    });
    
    router.get('/petshops/:id', (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const petshop = petshops.find((petshop) => petshop.id === id);
    
        if (!petshop) {
            res.status(400).json({ error: "petshop not found" });
            return;
        }
    
        res.status(200).send(petshop);
    });

    router.post('/petshops', (req: Request, res: Response, next: NextFunction) => {
        const { name, cnpj } = req.body;

        if (!name && !cnpj) {
            res.status(400).json({ error: "Missing required fields: name, cnpj" });
            return;
        }
        
        if (!name) {
            res.status(400).json({ error: "Missing required fields: name" });
            return;
        }

        if (!cnpj) {
            res.status(400).json({ error: "Missing required fields: cnpj" });
            return;
        }

        if (petshops.find(petshop => petshop.cnpj === cnpj)) {
            res.status(400).json({ error: "CNPJ already registered" });
            return;
        }

        const newPetshop: PetShop = {
            id: uuidv4(),
            name: name,
            cnpj: cnpj,
            pets: []
        };

        if(!newPetshop) {
            res.status(500).json({ error: "Failed to create petshop" });
            return;
        }

        petshops.push(newPetshop);
        res.status(201).send(newPetshop);
    });
}