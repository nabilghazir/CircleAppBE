import { PrismaClient, User } from "@prisma/client";
import { UpdateUserDTO } from "../DTO/user-dto";
import { CustomError } from "../middlewares/error-handling";


const Prisma = new PrismaClient()

class UserService {

    async GetUser(userID: number): Promise<Omit<User, "password"> | null> {
        const FetchUser = await Prisma.user.findUnique({
            where: {
                id: userID
            },
            select: {
                id: true,
                email: true,
                username: true,
                fullname: true,
                bio: true,
                image: true,
                background: true,
                followers: true,
                following: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return FetchUser;
    }

    async GetUserByID(id: number): Promise<Omit<User, "password"> & { _count: { followers: number; following: number } } | null> {
        const FetchUser = await Prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullname: true,
                username: true,
                bio: true,
                email: true,
                background: true,
                image: true,
                _count: {
                    select: {
                        followers: true,
                        following: true
                    }
                },
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return FetchUser
    }

    async UpdateUser(id: number, data: UpdateUserDTO): Promise<{ user: Pick<User, "fullname" | "username" | "bio"> }> {
        const FetchUser = await Prisma.user.findUnique({
            where: {
                id
            }
        });
        console.log(FetchUser)

        if (!FetchUser) {
            throw new CustomError("User not found", 408);
        }

        const UpdateUser = await Prisma.user.update({
            where: { id },
            data: {
                fullname: data.fullname || FetchUser.fullname,
                username: data.username || FetchUser.username,
                bio: data.bio || FetchUser.bio
            },
            select: {
                id: true,
                fullname: true,
                username: true,
                bio: true
            }
        })
        return {
            user: UpdateUser
        }
    }
}

export default new UserService()