import fs from "fs";
export async function getStaticProps({ params: { slug } }) {
    const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return {
        props: {
            frontmatter,
            content,
        },
    };
}

export function getStaticPaths() {
    const postsPaths = fs.readdirSync("_posts");
    const paths = postsPaths.map((fileName) => ({
        params: {
            slug: fileName.replace(".md", ""),
        },

        return {
            paths,
            fallback: false,
        };
    }
