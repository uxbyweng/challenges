import { Router } from "express";
import { renderAllPosts, renderEmptyNewPostForm, createNewPost, renderExistingPostForm, saveEditedPost, deletePost } from "../controllers/adminControllers";

const adminRoutes = Router();

// GET /admin renders a list of all posts with edit and delete buttons next to each entry.
adminRoutes.get("/admin", renderAllPosts);

// GET /admin/posts/new renders an empty form for creating a new post.
adminRoutes.get("/admin/posts/new", renderEmptyNewPostForm);

// POST /admin/posts creates a new post from the form submission and redirects back to /admin.
adminRoutes.post("/admin/posts", createNewPost);

// GET /admin/posts/:slug/edit renders a form pre-filled with the existing post data.
adminRoutes.get("/admin/posts/:slug/edit", renderExistingPostForm);

// POST /admin/posts/:slug saves the edited post and redirects back to /admin.
adminRoutes.post("/admin/posts/:slug", saveEditedPost);

// POST /admin/posts/:slug/delete removes the post and redirects back to /admin.
// Löschen ist ein POST (Formular-Button), kein Link, weil GET nie Daten verändern soll.
adminRoutes.post("/admin/posts/:slug/delete", deletePost);

export default adminRoutes;
