import { PrismaClient } from "@prisma/client";
import { query } from "express";

const Prisma = new PrismaClient();

export const SearchService = async (query: string) => {
    return await Prisma.post.findMany({
        where: {
            OR: [
                { author: { fullname: { contains: query, mode: "insensitive" } } },
                { content: { contains: query, mode: "insensitive" } }
            ]
        },
        include: {
            author: {
                select: {
                    fullname: true,
                    username: true
                }
            },
            replies: true

        }
    })
}