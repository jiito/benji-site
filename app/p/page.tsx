import fs from "fs";
import path from "path";

function getPosts() {
  const postsDirecotry = path.join(process.cwd(), "data/writing");
  const files = fs.readdirSync(postsDirecotry);
  return files.map((file) => {
    const filePath = path.join(postsDirecotry, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return fileContent;
  });
}

export default async function PostsPage() {
  const posts = getPosts();
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>{post}</div>
      ))}
    </div>
  );
}
