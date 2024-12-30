import { Request, Response, NextFunction } from "express";

const validateCnpj = (req: Request, res: Response, next: NextFunction) => {
    const cnpj = req.body.cnpj;
    const regexFormateCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    if (!cnpj) {
        res.status(400).json({ error: "Missing required field 'cnpj'" });
        return;
    }

    if (!regexFormateCnpj.test(cnpj)) {
        res.status(400).json({ error: "CNPJ must follow the format XX.XXX.XXX/XXXX-XX" });
        return;
    }

    next();
}

export default validateCnpj;