import Joi from "joi"
import { RepliesDTO } from "../../DTO/replies-dto"


export const RepliesSchema = Joi.object<RepliesDTO>({
    content: Joi.string().min(5),
    image: Joi.string(),
    postID: Joi.number().integer()
})