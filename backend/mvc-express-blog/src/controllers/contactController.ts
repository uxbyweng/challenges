import { type Request, type Response } from "express";

export const showContact = (_req: Request, res: Response) => {
    res.render("contact.html");
};
