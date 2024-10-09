import { Request, Response } from "express";
import { SearchService } from "../services/search-services";

export const SearchController = async (req: Request, res: Response) => {
    const { query } = req.query;
    const user = await SearchService(query as string)

    res.json(user)
}