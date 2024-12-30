import { Pets } from "../routes/pets";
import { PetShop } from "../routes/petShops";

declare global {
    namespace Express {
        interface Request {
            petshop?: PetShop;
            pet?: Pets;
        }
    }
}