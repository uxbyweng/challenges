import { Router } from "express";
import { showContact } from "../controllers/contactController";

const contactRoute = Router();

contactRoute.get("/contact", showContact);

export default contactRoute;
