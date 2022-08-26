import fs from "fs";
import ReactMarkdown from "react-markdown";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { Layout } from "../../components/Layout";

export const getStaticPaths: GetStaticPaths = () => {
  const postsPaths = fs.readdirSync("_posts");
  console.log(postsPaths);
  const paths = postsPaths.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const fileData = fs.readFileSync(`_posts/${params?.slug}.md`, "utf-8");
  return {
    props: {
      content: fileData,
    },
  };
};

const PostPage = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <ReactMarkdown children={content} />
    </Layout>
  );
};

export default PostPage;
