import { Router } from "express";
import { showBlogposts, showBlogpostBySlug } from "../controllers/blogpostControllers";

const blogpostRoutes = Router();

blogpostRoutes.get("/", showBlogposts); // Startseite
blogpostRoutes.get("/posts/:slug", showBlogpostBySlug);

export default blogpostRoutes;
