import { LoginDTO, RegisterDTO } from "../DTO/auth-dto";
import { PrismaClient, User } from "@prisma/client";
import { CustomError } from "../middlewares/error-handling";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { custom } from "joi";

const Prisma = new PrismaClient

class AuthService {
    async Register(
        data: RegisterDTO
    ): Promise<{ User: Omit<User, "password"> }> {
        const salt = 10
        const HashedPassword = await bcrypt.hash(data.password, salt)

        const CreateUsername = data.email.split("@")[0]

        const FetchUser = await Prisma.user.create({
            data: {
                ...data,
                password: HashedPassword,
                username: CreateUsername
            }
        })

        const { password, ...RegisterUser } = FetchUser;
        return {
            User: RegisterUser
        }
    }

    async Login(
        data: LoginDTO
    ): Promise<{ User: Omit<User, "password">; token: string }> {
        const FetchUser = await Prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.username },
                    { username: data.username }
                ]
            }
        });

        if (FetchUser?.email && FetchUser?.username === "") {
            throw new CustomError("Please Input Email / Username !!!", 409)

        }

        if (!FetchUser) {
            throw new CustomError("User not found", 410)
        }

        const PasswordValidation = await bcrypt.compare(data.password, FetchUser.password)

        if (!PasswordValidation) {
            throw new CustomError("Wrong password", 411)
        }

        const { password, ...LoginUser } = FetchUser;

        const SecretKey = process.env.JWT_SECRET as string;
        const token = jwt.sign(LoginUser, SecretKey)

        return {
            User: LoginUser,
            token
        }

    }
};

export default new AuthService()