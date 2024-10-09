import { LoginDTO, RegisterDTO } from "../../DTO/auth-dto";
import Joi from "joi";


export const RegisterSchema = Joi.object<RegisterDTO>({
    fullname: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
})

export const LoginSchema = Joi.object<LoginDTO>({
    email: Joi.string().email().optional(),
    username: Joi.string().min(5).optional(),
    password: Joi.string().min(5).required(),
})
