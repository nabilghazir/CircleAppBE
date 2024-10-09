import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { CustomError } from "./error-handling";
import { ReqUser } from "../types/req-user";

export function Authentication(req: ReqUser, res: Response, next: NextFunction) {
    const AuthorizationHeader = req.headers["authorization"];
    if (!AuthorizationHeader || !AuthorizationHeader.startsWith("Bearer ")) {
        return new CustomError("Unauthenticated", 401)
    }

    const Token = AuthorizationHeader.replace("Bearer ", "");
    if (!Token) {
        return new CustomError("Unauthenticated", 401);
    }
    const SecretKey = process.env.JWT_SECRET as string;

    const Decode = jwt.verify(Token, SecretKey);
    (req as any).user = Decode;
    next()
}

