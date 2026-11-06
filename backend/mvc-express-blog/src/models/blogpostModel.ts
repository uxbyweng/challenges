import { getDB } from "../db/database";
import { slugify } from "../utils/slugify-utils";

export interface Post {
    title: string;
    slug: string;
    image: string;
    author: string;
    createdAt: number;
    teaser: string;
    content: string;
}

export type SortOrder = "newest" | "oldest";

const PAGE_SIZE = 2;

export function getBlogposts(authorFilter: string, sortBy: SortOrder, page: number) {
    const filteredPosts = authorFilter ? getAllPosts().filter((post) => post.author.toLowerCase().includes(authorFilter.toLowerCase())) : getAllPosts();

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortBy === "oldest") {
            return a.createdAt - b.createdAt;
        }
        return b.createdAt - a.createdAt;
    });

    const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pagedPosts = sortedPosts.slice(start, start + PAGE_SIZE);

    return { pagedPosts, totalPages, currentPage };
}

export function getBlogpostBySlug(slug: string): Post | undefined {
    return getAllPosts().find((post) => slugify(post.title) === slug);
}

// alle Posts aus Tabelle blog_entries auslesen
export function getAllPosts(): Post[] {
    return getDB().query("SELECT title, slug, image, author, createdAt, teaser, content FROM blog_entries").all() as Post[];
}

// passende id finden
function findIdBySlug(slug: string): number | undefined {
    const rows = getDB().query("SELECT id, title FROM blog_entries").all() as { id: number; title: string }[];
    return rows.find((row) => slugify(row.title) === slug)?.id;
}

// Neuen Post speichern
export function addPost(post: Post) {
    getDB()
        .query("INSERT INTO blog_entries (title, slug, image, author, createdAt, teaser, content) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .run(post.title, post.slug, post.image, post.author, post.createdAt, post.teaser, post.content);
}

export function updatePost(slug: string, changes: Partial<Post>) {
    const id = findIdBySlug(slug);
    const current = getBlogpostBySlug(slug);
    if (id === undefined || !current) return;

    const post = { ...current, ...changes };
    getDB()
        .query("UPDATE blog_entries SET title = ?, slug = ?, image = ?, author = ?, createdAt = ?, teaser = ?, content = ? WHERE id = ?")
        .run(post.title, post.slug, post.image, post.author, post.createdAt, post.teaser, post.content, id);
}

export function deletePost(slug: string) {
    const id = findIdBySlug(slug);
    if (id === undefined) return;
    getDB().query("DELETE FROM blog_entries WHERE id = ?").run(id);
}
