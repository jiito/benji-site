import fs from "fs";
import path from "path";
import Link from "next/link";

function getPostSlugs() {
  const postsDirecotry = path.join(process.cwd(), "data/posts");
  const files = fs.readdirSync(postsDirecotry);
  // TODO: sort by front-matter? 
  return files.map(fileToSlug);

}

function fileToSlug(file: string) {
  return file.replace(".md", "");
}

export default async function PostsPage() {
  const postSlugs = getPostSlugs();
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Posts</h1>
      <ul className="list-disc list-inside">

      {postSlugs.map((postSlug) => (
          <li key={postSlug}>
            <Link href={`/p/${postSlug}`}>{postSlug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
