import { slugify } from "../utils/slugify-utils";

export interface Post {
    title: string;
    image: string;
    author: string;
    createdAt: number;
    teaser: string;
    content: string;
}

export type SortOrder = "newest" | "oldest";

const seedPosts: Post[] = [
    {
        title: "Black: The Absence, Not the Presence, of Color",
        image: "colorful-umbrella.jpg",
        author: "Peter Parker",
        createdAt: 1743120000,
        teaser: "Scientifically, black is not a color but rather the absence of all colors, occurring when an object absorbs nearly all light wavelengths instead of reflecting them.",
        content:
            "<p>When you think about the rainbow, you see a vibrant spectrum of hues. But black does not appear in that spectrum the same way red or blue does.</p><p>From a scientific perspective, black is usually the absence of visible light, not a reflected wavelength.</p>",
    },
    {
        title: "Flowers: Nature's Muse for Design",
        image: "flowers.jpg",
        author: "Peter Parker",
        createdAt: 1745452800,
        teaser: "Flowers inspire design with their color palettes, structure, and balance between repetition and variation.",
        content: "<p>Designers borrow from flowers all the time: layered composition, contrasting accents, and natural hierarchy.</p>",
    },
    {
        title: "UDesign's Harmony: Core Purpose and Supporting Details",
        image: "sailing.jpg",
        author: "Peter Parker",
        createdAt: 1748736000,
        teaser: "Strong design starts with one clear core idea, then adds supporting details that reinforce it.",
        content:
            "<p>A useful mental model is major and minor elements. Major elements communicate the main point, minor elements support it without stealing focus.</p>",
    },
];

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

let posts: Post[] = seedPosts;

export function getAllPosts(): Post[] {
    return posts;
}

export function writePosts(newPosts: Post[]) {
    posts = newPosts;
}

export function addPost(post: Post) {
    const all = getAllPosts();
    writePosts([...all, post]);
}

export function updatePost(slug: string, changes: Partial<Post>) {
    const all = getAllPosts();
    const updated = all.map((post) => (slugify(post.title) === slug ? { ...post, ...changes } : post));
    writePosts(updated);
}

export function deletePost(slug: string) {
    const all = getAllPosts();
    const remaining = all.filter((post) => slugify(post.title) !== slug);
    writePosts(remaining);
}
