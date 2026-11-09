import { Router } from "express";
import { showAbout } from "../controllers/aboutController";

const aboutRoute = Router();

aboutRoute.get("/about", showAbout);

export default aboutRoute;
