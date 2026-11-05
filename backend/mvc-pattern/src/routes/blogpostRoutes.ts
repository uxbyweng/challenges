import { Router } from "express";
import { showBlogposts, showBlogpostBySlug, showAbout, showContact, showExamplePost } from "../controllers/blogpostControllers";

const blogpostRoutes = Router();

blogpostRoutes.get("/", showBlogposts);
blogpostRoutes.get("/posts/:slug", showBlogpostBySlug);
blogpostRoutes.get("/example-post", showExamplePost);
blogpostRoutes.get("/about", showAbout);
blogpostRoutes.get("/contact", showContact);

export default blogpostRoutes;
