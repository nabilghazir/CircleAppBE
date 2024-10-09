import { Response } from "express";
import { ReqUser } from "../types/req-user";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

class LikesController {
    async GetLikes(req: ReqUser, res: Response) {
        const postID = parseInt(req.params.postID)
        const userID = req.user.id;

        const FetchPost = await Prisma.post.findUnique({
            where: {
                id: postID
            },
            include: {
                Like: {
                    where: { userID }
                }
            }
        })
        if (!FetchPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isLiked = FetchPost.Like && FetchPost.Like.length > 0;

        const LikesCount = FetchPost.Like ? FetchPost.Like.length : 0;

        res.json({ isLiked, LikesCount });
    }

    async LikePost(req: ReqUser, res: Response) {
        const postID = parseInt(req.params.postID);
        const userID = req.user.id;

        const LikesValidation = await Prisma.like.findUnique({
            where: { userID_postID: { userID, postID } }
        })

        if (LikesValidation) {
            await Prisma.like.delete({
                where: { id: LikesValidation.id }
            });
            await Prisma.post.update({
                where: { id: postID },
                data: { likesCount: { decrement: 1 } }
            })
            return res.json({ message: "Like Removed" })
        } else {
            await Prisma.like.create({
                data: { postID, userID }
            });
            await Prisma.post.update({
                where: { id: postID },
                data: { likesCount: { increment: 1 } }
            });
            return res.json({ message: "Like Added" });
        }
    }
}

export default new LikesController()