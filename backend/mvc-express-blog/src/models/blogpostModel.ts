import { getDB } from "../db/database";

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
    return getAllPosts().find((post) => post.slug === slug);
}

// alle Posts aus Tabelle blog_entries auslesen
export function getAllPosts(): Post[] {
    return getDB().query("SELECT title, slug, image, author, createdAt, teaser, content FROM blog_entries").all() as Post[];
}

// passende id finden
function findIdBySlug(slug: string): number | undefined {
    const row = getDB().query("SELECT id FROM blog_entries WHERE slug = $slug").get({ slug }) as { id: number } | null;
    return row ? row.id : undefined;
}

// Neuen Post speichern
export function addPost(post: Post) {
    getDB()
        .query(
            "INSERT INTO blog_entries (title, slug, image, author, createdAt, teaser, content) VALUES ($title, $slug, $image, $author, $createdAt, $teaser, $content)",
        )
        .run({
            title: post.title,
            slug: post.slug,
            image: post.image,
            author: post.author,
            createdAt: post.createdAt,
            teaser: post.teaser,
            content: post.content,
        });
}

// gibt zurück, ob eine Zeile geändert wurde
export async function updatePost(slug: string, changes: Partial<Post>): Promise<boolean> {
    const id = findIdBySlug(slug);
    const current = getBlogpostBySlug(slug);
    if (id === undefined || !current) return false;

    const post = { ...current, ...changes };
    const result = getDB()
        .query(
            "UPDATE blog_entries SET title = $title, slug = $slug, image = $image, author = $author, createdAt = $createdAt, teaser = $teaser, content = $content WHERE id = $id",
        )
        .run({
            title: post.title,
            slug: post.slug,
            image: post.image,
            author: post.author,
            createdAt: post.createdAt,
            teaser: post.teaser,
            content: post.content,
            id,
        });
    return result.changes > 0;
}

// gibt zurück, ob eine Zeile gelöscht wurde
export async function deletePost(slug: string): Promise<boolean> {
    const id = findIdBySlug(slug);
    if (id === undefined) return false;
    const result = getDB().query("DELETE FROM blog_entries WHERE id = $id").run({ id });
    return result.changes > 0;
}
