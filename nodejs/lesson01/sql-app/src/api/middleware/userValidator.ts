import { NextFunction, Request,  Response } from "express";
import { body, validationResult } from "express-validator";

export const userValidatorRules = () =>{
    return [
        body('username').isAlphanumeric(),
        body('password').isLength({ min:8}).withMessage('El passoword debe ser minimo 8'),
        body('email').isEmail(),
        body('roleId').isString
        ]
}

export const validate = (req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}