import { Post, PrismaClient } from "@prisma/client";
import { PostDTO, UpdatePostDTO } from "../DTO/post-dto";
import { ReqUser } from "../types/req-user";



const Prisma = new PrismaClient

class PostService {
    async GetAllPost(authorID: number): Promise<Post[]> {
        const FetchPostData = await Prisma.post.findMany({
            where: { authorID },
            include: {
                author: {
                    omit: {
                        password: true
                    }
                }, replies: true
            }
        })

        const FetchRepliesCount = FetchPostData.map((FetchPostData) => {
            return {
                ...FetchPostData,
                FetchRepliesCount: FetchPostData.replies.length
            }
        })

        return FetchRepliesCount
    }

    async GetAllPostByAuthor(authorID: number): Promise<Post[]> {
        const FetchPostData = await Prisma.post.findMany({
            where: { authorID },
            include: {
                replies: true,
                author: {
                    omit: {
                        password: true
                    }
                }
            }
        })
        return FetchPostData
    }

    async GetPostByID(id: number): Promise<Post | null> {
        return await Prisma.post.findUnique({
            where: {
                id
            },
            include: {
                replies: true,
                author: {
                    select: {
                        fullname: true,
                        username: true,
                        image: true,
                        background: true
                    }
                }
            }
        })
    }

    async CreatePost(data: PostDTO, authorID: number): Promise<Post | null> {
        return await Prisma.post.create({
            data: {
                ...data,
                authorID: authorID,
            }
        })
    }

    async UpdatePost(data: UpdatePostDTO): Promise<Post | null> {
        const FetchPost = await Prisma.post.findUnique({
            where: {
                id: data.id
            }
        });

        const UpdatePost: Partial<Post> = {};
        if (FetchPost && data.content) {
            FetchPost.content = data.content;
        }

        if (FetchPost && data.image) {
            FetchPost.image = data.image;
        }

        return await Prisma.post.update({
            data: UpdatePost,
            where: {
                id: data.id
            }
        })
    }

    async DeletePost(id: number): Promise<Post | null> {
        return await Prisma.post.delete({
            where: { id }
        })
    }
};

export default new PostService();