import Joi from "joi"
import { PostDTO } from "../../DTO/post-dto"


export const PostSchema = Joi.object<PostDTO>({
    content: Joi.string().min(5),
    image: Joi.string().optional().allow(null, ''),
    authorID: Joi.number().integer()
})
