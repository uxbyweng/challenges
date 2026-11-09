import { type Request, type Response } from "express";

export const showAbout = (_req: Request, res: Response) => {
    res.render("about.html");
};
