import { PetShop } from "../routes/petShops";

declare global {
    namespace Express {
        interface Request {
            petshop?: PetShop;
            data?: {
                name?: string, 
                cnpj?: string
            };
        }
    }
}