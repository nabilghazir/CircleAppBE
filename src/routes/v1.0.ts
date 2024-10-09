import express from "express";
import { Request, Response } from "express";
import authController from "../controller/auth-controller";
import postController from "../controller/post-controller";
import repliesController from "../controller/replies-controller";
import userController from "../controller/user-controller";
import likeController from "../controller/like-controller";
import { Authentication } from "../middlewares/authentication";
import { catchAsync } from "../utils/catch-async";
import upload from "../middlewares/upload-image";

export const routerV1 = express.Router();

routerV1.get("/", (req: Request, res: Response) => {
    res.send("Nice Try")
});

routerV1.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("Token");
    return res.status(200).json({
        message:
            "Logout Successfully"
    })
});

// Auth Routes
routerV1.post("/auth/register", catchAsync(authController.Register));

routerV1.post("/auth/login", catchAsync(authController.Login));

routerV1.get("/auth/check", catchAsync(Authentication), catchAsync(authController.Auth));

// Update user
routerV1.put("/user", catchAsync(Authentication), upload.fields([{ name: "image", maxCount: 1 }, { name: "background", maxCount: 1 }]), catchAsync(userController.Update));

// Fetch All Data
routerV1.get("/get-user", catchAsync(Authentication), catchAsync(userController.GetUser));

routerV1.get("/get-all-user", catchAsync(Authentication), catchAsync(userController.GetAllUser));

routerV1.get("/get-all-post", catchAsync(postController.GetAllPost));

// Fetch User by ID
routerV1.get("/get-user-by-id/:userID", catchAsync(userController.GetUserByID.bind(userController)));

// Create New Post & Replies
routerV1.post("/post", catchAsync(Authentication), upload.single("image"), catchAsync(postController.CreatePost))

routerV1.post("/post/:postID/replies", catchAsync(Authentication), upload.single("image"), catchAsync(repliesController.CreateReplies));

// Fetch Status by ID
routerV1.get("/post/status/:postID", catchAsync(postController.GetPostByID.bind(postController)));

// Fetch Replies by Post
routerV1.get("/post/:postID/replies", catchAsync(Authentication), catchAsync(repliesController.GetRepliesByPost));

// Fetch Post by ID
routerV1.get("/post/:authorID", catchAsync(Authentication), catchAsync(postController.GetPostByAuthor));
routerV1.get("/profile/post/:userID", catchAsync(postController.GetPostByUserID));

// Like Post
routerV1.post("/post/:postID/like", catchAsync(Authentication), catchAsync(likeController.LikePost));

// Get All Like Post
routerV1.get("/post/:postID/like", catchAsync(Authentication), catchAsync(likeController.GetLikes))