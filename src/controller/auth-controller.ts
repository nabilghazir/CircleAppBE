import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../utils/schemas/auth-schema";
import AuthService from "../services/auth-services";




class AuthController {
    async Register(req: Request, res: Response) {

        const FetchingDataValidation = await RegisterSchema.validateAsync(req.body);

        const ParsingUser = await AuthService.Register(FetchingDataValidation);

        res.json(ParsingUser)
    }

    async Login(req: Request, res: Response) {

        const FetchingDataValidation = await LoginSchema.validateAsync(req.body);

        const ParsingUser = await AuthService.Login(FetchingDataValidation);

        res.json(ParsingUser)
    }

    async Auth(req: Response, res: Response) {
        const FetchUser = (req as any).user;
        res.json(FetchUser)
    }
}

export default new AuthController()