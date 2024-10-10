import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../utils/schemas/auth-schema";
import AuthService from "../services/auth-services";




class AuthController {
    async Register(req: Request, res: Response) {
        try {

            const RegisterDataValidation = await RegisterSchema.validateAsync(req.body);

            const ParsingUser = await AuthService.Register(RegisterDataValidation);

            res.json(ParsingUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async Login(req: Request, res: Response) {

        try {
            const FetchingDataValidation = await LoginSchema.validateAsync(req.body);
            console.log(FetchingDataValidation);

            const ParsingUser = await AuthService.Login(FetchingDataValidation);

            res.json(ParsingUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async Auth(req: Response, res: Response) {
        try {
            const FetchUser = (req as any).user;
            res.json(FetchUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default new AuthController()