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
}