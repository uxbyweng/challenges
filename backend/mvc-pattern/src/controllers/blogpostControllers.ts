import { type Request, type Response } from "express";
import { getBlogposts, getBlogpostBySlug, type SortOrder } from "../models/blogpostModel";
import { slugify } from "../utils/slugify-utils";
import { formatDate } from "../utils/date-utils";

export const showBlogposts = (req: Request, res: Response) => {
    const authorFilter = typeof req.query.author === "string" ? req.query.author.trim() : "";
    const sort: SortOrder = req.query.sort === "oldest" ? "oldest" : "newest";
    const page = typeof req.query.page === "string" && Number.isInteger(Number(req.query.page)) ? Math.max(1, Number(req.query.page)) : 1;

    const { pagedPosts, totalPages, currentPage } = getBlogposts(authorFilter, sort, page);

    const view = pagedPosts.map((post) => ({
        ...post,
        slug: slugify(post.title),
        createdAt: formatDate(post.createdAt),
    }));

    res.render("index.html", {
        posts: view,
        controls: {
            author: authorFilter,
            sort,
            page: currentPage,
            totalPages,
            hasPrev: currentPage > 1,
            hasNext: currentPage < totalPages,
        },
    });
};

export const showBlogpostBySlug = (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
        res.status(400).send("Invalid slug");
        return;
    }

    const post = getBlogpostBySlug(slug);
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }

    res.render("post.html", {
        post: { ...post, createdAt: formatDate(post.createdAt) },
    });
};

export const showAbout = (_req: Request, res: Response) => {
    res.render("about.html");
};

export const showContact = (_req: Request, res: Response) => {
    res.render("contact.html");
};
