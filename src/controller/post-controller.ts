import { Request, Response } from "express";
import { PostSchema } from "../utils/schemas/post-schema";
import { PrismaClient } from "@prisma/client";
import { ReqUser } from "../types/req-user";
import postServices from "../services/post-services";
import { TimeFormat } from "../utils/count-post";
import cloudinaryService from "../services/cloudinary-service";

const Prisma = new PrismaClient();

class PostController {
    async GetAllPost(req: Request, res: Response) {
        const FetchPost = await Prisma.post.findMany({
            include: {
                author: {
                    select: {
                        fullname: true,
                        username: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        })
        res.json(FetchPost)
    }

    async GetPostByAuthor(req: ReqUser, res: Response) {
        const AuthorID = Number(req.params.authorID)

        const ParsedPost = await postServices.GetAllPost(AuthorID)

        res.json(ParsedPost)
    }

    async GetPostByUserID(req: ReqUser, res: Response) {
        const userID = Number(req.params.userID)
        const FetchPost = await postServices.GetAllPostByAuthor(userID);
        const CountedPost = FetchPost.map((post) => ({
            ...post,
            timeAgo: TimeFormat(new Date(post.createdAt))
        }))
        res.json(CountedPost)
    }

    async GetPostByID(req: ReqUser, res: Response) {
        const { postID } = req.params;

        const ParsedPost = await postServices.GetPostByID(parseInt(postID));

        res.json({ data: ParsedPost });
    }

    async CreatePost(req: ReqUser, res: Response) {
        // const FetchFile = req.file?.filename as string;
        let imageUrl: string | undefined;
        if (req.file) {
            const image = await cloudinaryService.upload(req.file);
            imageUrl = image.secure_url;
        }
        const body = {
            ...req.body,
            ...(imageUrl && { image: imageUrl })
        }

        const FetchingDataValidation = await PostSchema.validateAsync(body);

        const ParsedPost = await postServices.CreatePost(FetchingDataValidation, req.user.id);

        res.json(ParsedPost);
    }

    async UpdatePost(req: ReqUser, res: Response) {
        const id = Number(req.params.id);

        const FetchingDataValidation = await PostSchema.validateAsync(req.body);

        const UpdatePost = await postServices.UpdatePost({
            ...FetchingDataValidation,
            id
        });

        res.json(UpdatePost);
    }

    async DeletePost(req: ReqUser, res: Response) {
        const id = Number(req.params.id);
        const DeletePost = await postServices.DeletePost(id);
        res.json(DeletePost);
    }
}

export default new PostController()