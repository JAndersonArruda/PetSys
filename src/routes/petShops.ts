import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Pets } from './pets';

interface PetShop {
    id: string,
    name: string,
    cnpj: string,
    pets: Pets[]
}

let petshops: PetShop[] = [];

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

    router.put('/petshops/:id', (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const petshop = petshops.find(petshop => petshop.id === id);

        if (!petshop) {
            res.status(404).json({ error: "Petshop not found" });
            return;
        }

        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            res.status(400).json({ error: "Missing required fields from update" });
            return;
        }
    
        if (data.cnpj) {
            res.status(400).json({ error: "Field 'cnpj' cannot be updated" })
            return;
        }

        if (data.name) petshop.name = data.name;
        res.status(200).json({ message: "Update successful" });
    });

    router.delete('/petshops/:id', (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const dellShop = petshops.find(petshop => petshop.id === id);

        if (!dellShop) {
            res.status(400).json({ error: "Petshop not found" });
            return;
        }

        petshops = petshops.filter(petshop => petshop.id !== id);
        res.status(200).json({ message: "Petshop deleted successfully" });
    });
}