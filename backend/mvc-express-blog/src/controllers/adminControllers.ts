import { type Request, type Response } from "express";
import { getAllPosts, getBlogpostBySlug, addPost, updatePost, deletePost as deletePostFromModel, type Post } from "../models/blogpostModel";
import { slugify } from "../utils/slugify-utils";
import { formatDate } from "../utils/date-utils";
import { sanitizeContent } from "../utils/sanitize-utils";

const readSlug = (req: Request): string => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    return slug ?? "";
};

const readField = (req: Request, name: string): string => {
    const value = req.body?.[name];
    return typeof value === "string" ? value.trim() : "";
};

const readPostForm = (req: Request): { error: string } | { fields: Omit<Post, "createdAt"> } => {
    const title = readField(req, "title");
    const author = readField(req, "author");
    const image = readField(req, "image");
    const teaser = readField(req, "teaser");
    const content = sanitizeContent(readField(req, "content"));
    // Slug einmal aus dem Titel berechnen: wird gespeichert und für die URL genutzt
    const slug = slugify(title);

    if (!title || !author || !image || !teaser || !content) {
        return { error: "All fields are required." };
    }
    if (!slug) {
        return { error: "The title must contain letters or numbers." };
    }
    if (!/^[\w.-]+$/.test(image)) {
        return { error: "Image must be a file name like flowers.jpg." };
    }
    return { fields: { title, slug, author, image, teaser, content } };
};

export const renderAllPosts = (_req: Request, res: Response) => {
    const view = [...getAllPosts()]
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((post) => ({
            ...post,
            createdAt: formatDate(post.createdAt),
        }));

    res.render("admin.html", { posts: view });
};

export const renderEmptyNewPostForm = (_req: Request, res: Response) => {
    res.render("adminForm.html", { heading: "New post", action: "/admin/posts" });
};

export const createNewPost = (req: Request, res: Response) => {
    const result = readPostForm(req);
    if ("error" in result) {
        res.status(400).send(result.error);
        return;
    }

    if (getBlogpostBySlug(result.fields.slug)) {
        res.status(409).send("A post with this title already exists.");
        return;
    }

    addPost({ ...result.fields, createdAt: Math.floor(Date.now() / 1000) });
    res.redirect("/admin");
};

export const renderExistingPostForm = (req: Request, res: Response) => {
    const slug = readSlug(req);
    const post = getBlogpostBySlug(slug);
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }

    res.render("adminForm.html", { heading: "Edit post", action: `/admin/posts/${slug}`, post });
};

export const saveEditedPost = (req: Request, res: Response) => {
    const slug = readSlug(req);
    if (!getBlogpostBySlug(slug)) {
        res.status(404).send("Post not found");
        return;
    }

    const result = readPostForm(req);
    if ("error" in result) {
        res.status(400).send(result.error);
        return;
    }

    const newSlug = result.fields.slug;
    if (newSlug !== slug && getBlogpostBySlug(newSlug)) {
        res.status(409).send("A post with this title already exists.");
        return;
    }

    updatePost(slug, result.fields);
    res.redirect("/admin");
};

export const deletePost = (req: Request, res: Response) => {
    const slug = readSlug(req);
    if (!getBlogpostBySlug(slug)) {
        res.status(404).send("Post not found");
        return;
    }

    deletePostFromModel(slug);
    res.redirect("/admin");
};
