import sanitizeHtml from "sanitize-html";

export function sanitizeContent(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: ["p", "br", "h1", "h2", "h3", "h4", "h5", "h6", "a", "ul", "ol", "li", "img", "strong", "em", "blockquote"],
        allowedAttributes: {
            a: ["href", "title"],
            img: ["src", "alt"],
        },
        allowedSchemes: ["http", "https", "mailto"],
    });
}
