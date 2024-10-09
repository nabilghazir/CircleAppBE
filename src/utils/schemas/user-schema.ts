import Joi from "joi"
import { UserDTO } from "../../DTO/user-dto"


export const UserSchema = Joi.object<UserDTO>({
    fullname: Joi.string().min(5).max(20),
    username: Joi.string().min(5).max(20),
    bio: Joi.string().max(100)
})