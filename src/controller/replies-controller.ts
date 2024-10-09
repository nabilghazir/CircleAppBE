import { Response } from "express";
import { RepliesSchema } from "../utils/schemas/replies-schema";
import { ReqUser } from "../types/req-user";
import repliesServices from "../services/replies-services";

class RepliesController {
    async GetRepliesByPost(req: ReqUser, res: Response) {
        const postID = Number(req.params.postID);

        const ParsedReplies = await repliesServices.GetRepliesByPost(postID);

        res.json(ParsedReplies);
    }

    async CreateReplies(req: ReqUser, res: Response) {
        const postID = Number(req.params.postID);
        const FetchingDataValidation = await RepliesSchema.validateAsync(req.body);

        const ParsedReplies = await repliesServices.CreateReplies({
            ...FetchingDataValidation,
            postID
        }, req.user.id);

        res.json(ParsedReplies);
    }


    async UpdateReplies(req: ReqUser, res: Response) {
        const id = Number(req.params.id);

        const FetchingDataValidation = await RepliesSchema.validateAsync(req.body);

        const UpdateReplies = await repliesServices.UpdateReplies({
            ...FetchingDataValidation,
            id
        });

        res.json(UpdateReplies);
    }

    async DeleteReplies(req: ReqUser, res: Response) {
        const id = Number(req.params.id);

        const DeleteReplies = await repliesServices.DeleteReplies(id);

        res.json(DeleteReplies);
    }
}

export default new RepliesController()