import { PrismaClient, Replies } from "@prisma/client";
import { RepliesDTO, UpdateRepliesDTO } from "../DTO/replies-dto";
import { CustomError } from "../middlewares/error-handling";

const Prisma = new PrismaClient();

class RepliesService {
    async GetRepliesByPost(postID: number): Promise<Replies[]> {
        return await Prisma.replies.findMany({
            where: { postID },
            include: {
                author: {
                    select: {
                        fullname: true,
                        username: true
                    }
                }
            }
        })
    }

    async CreateReplies(data: RepliesDTO, authorID: number): Promise<Replies | null> {
        if (!data.postID) {
            throw new Error('Post ID is required to create a reply.');
        }

        const CreateReplies = await Prisma.replies.create({
            data: {
                content: data.content,
                image: data.image || null,
                postID: data.postID,
                authorID: authorID
            }
        });

        const RepliesCount = await Prisma.replies.count({
            where: { postID: data.postID }
        });

        await Prisma.post.update({
            where: { id: data.postID },
            data: { repliesCount: RepliesCount }
        });
        return CreateReplies;
    }

    async UpdateReplies(data: UpdateRepliesDTO): Promise<Replies | null> {
        const FetchReplies = await Prisma.replies.findUnique({
            where: {
                id: data.id
            }
        })

        const UpdateReplies: Partial<Replies> = {};

        if (FetchReplies && data.content) {
            UpdateReplies.content = data.content;
        }

        if (FetchReplies && data.image) {
            UpdateReplies.image = data.image;
        }

        if (FetchReplies && data.postID) {
            UpdateReplies.postID = data.postID;
        }

        return await Prisma.replies.update({
            data: UpdateReplies,
            where: { id: data.id }
        });
    }

    async DeleteReplies(id: number): Promise<Replies | null> {
        const FetchReplies = await Prisma.replies.findUnique({
            where: { id }
        });

        if (!FetchReplies) {
            throw new CustomError("Replies not found", 405)
        }

        await Prisma.replies.delete({
            where: { id }
        });

        const RepliesCount = await Prisma.replies.count({
            where: { postID: FetchReplies.postID }
        });

        await Prisma.post.update({
            where: { id: FetchReplies.postID },
            data: { repliesCount: RepliesCount }
        });

        return FetchReplies;
    }
}

export default new RepliesService()