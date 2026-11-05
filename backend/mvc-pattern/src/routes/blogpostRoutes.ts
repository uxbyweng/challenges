import { Router } from "express";
import { showBlogposts, showBlogpostBySlug, showAbout, showContact } from "../controllers/blogpostControllers";

const blogpostRoutes = Router();

blogpostRoutes.get("/", showBlogposts); // Startseite
blogpostRoutes.get("/posts/:slug", showBlogpostBySlug);
blogpostRoutes.get("/about", showAbout);
blogpostRoutes.get("/contact", showContact);

export default blogpostRoutes;
