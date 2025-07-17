import fs from "fs";
import path from "path";
import Link from "next/link";

function getPostSlugs() {
  const postsDirecotry = path.join(process.cwd(), "data/posts");
  const files = fs.readdirSync(postsDirecotry);
  return files.map(fileToSlug);
}

function fileToSlug(file: string) {
  return file.replace(".md", "");
}

export default async function PostsPage() {
  const postSlugs = getPostSlugs();
  return (
    <div>
      {postSlugs.map((postSlug) => (
        <Link href={`/p/${postSlug}`} key={postSlug}>
          {postSlug}
        </Link>
      ))}
    </div>
  );
}
