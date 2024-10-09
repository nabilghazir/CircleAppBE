import { NextFunction, Request, Response } from "express";
import UserServices from "../services/user-services";
import { ReqUser } from "../types/req-user";
import { UserSchema } from "../utils/schemas/user-schema";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const Prisma = new PrismaClient();

class UserController {
    async GetAllUser(req: ReqUser, res: Response, next: NextFunction) {
        const FetchID = req.user?.id;
        const FetchUser = await Prisma.user.findMany({
            where: { id: { not: FetchID } },
            select: {
                id: true,
                email: true,
                fullname: true,
                username: true,
                bio: true,
                followers: true,
                following: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })
        return res.json(FetchUser)
    }

    async GetUser(req: ReqUser, res: Response) {
        const FetchID = req.user.id
        const FetchUser = await UserServices.GetUser(FetchID);
        const following = FetchID?._count
        res.json(FetchUser)
    }

    async GetUserByID(req: ReqUser, res: Response) {
        const { userID } = req.params;
        const FetchUser = await UserServices.GetUserByID(parseInt(userID));

        const following = FetchUser?._count.following;
        const followers = FetchUser?._count.followers;

        res.json({
            ...FetchUser,
            following,
            followers
        })
    }


    async Update(req: ReqUser, res: Response) {
        const FetchID = parseInt(req.user.id);

        const FetchingDataValidation = await UserSchema.validateAsync(req.body);
        console.log(FetchingDataValidation)

        const UpdateUser = await UserServices.UpdateUser(FetchID, FetchingDataValidation);

        res.json(UpdateUser)
    }
}

export default new UserController()