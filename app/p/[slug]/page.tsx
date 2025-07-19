import fs from "fs";
import path from "path";
import { Markdown } from "@/components/mardown";

function getPost(slug: string) {
  const postDirecotry = path.join(process.cwd(), "data/posts");
  const files = fs.readdirSync(postDirecotry);
  const post = files.find((file) => file.replace(".md", "") === slug);
  if (!post) {
    return null;
  }
  const filePath = path.join(postDirecotry, post);
  const fileContent = fs.readFileSync(filePath, "utf8");
  return fileContent;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <Markdown>{post}</Markdown>
    </div>
  );
}
