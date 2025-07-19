import ReactMarkdown, { Components } from "react-markdown";
import Image from "next/image";
import remarkFrontmatter from "remark-frontmatter";

const components: Components = {
  a: ({ children, href }) => {
    return (
      <a
        className="text-blue-500 underline"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  h1: ({ children }) => {
    return <h1 className="text-2xl font-bold">{children}</h1>;
  },
  h2: ({ children }) => {
    return <h2 className="text-xl font-bold">{children}</h2>;
  },
  h3: ({ children }) => {
    return <h3 className="text-lg font-bold">{children}</h3>;
  },
  h4: ({ children }) => {
    return <h4 className="text-base font-bold">{children}</h4>;
  },
  h5: ({ children }) => {
    return <h5 className="text-sm font-bold">{children}</h5>;
  },
  h6: ({ children }) => {
    return <h6 className="text-xs font-bold">{children}</h6>;
  },
  p: ({ children }) => {
    return <p className="text-base">{children}</p>;
  },
  ul: ({ children }) => {
    return <ul className="list-disc list-inside">{children}</ul>;
  },
  ol: ({ children }) => {
    return <ol className="list-decimal list-inside">{children}</ol>;
  },
  li: ({ children }) => {
    return <li className="list-item">{children}</li>;
  },
  blockquote: ({ children }) => {
    return (
      <blockquote className="border-l-4 border-gray-300 pl-4">
        {children}
      </blockquote>
    );
  },
  code: ({ children }) => {
    return <code className="bg-gray-100 p-1 rounded-md">{children}</code>;
  },
  img: ({ src, alt }) => {
    if (!src) return null;
    return <Image src={src} alt={alt || ""} width={500} height={300} />;
  },
  hr: () => {
    return <hr className="my-4" />;
  },
  table: ({ children }) => {
    return <table className="table-auto">{children}</table>;
  },
};

export const Markdown = ({ children }: { children: string }) => {
  return <ReactMarkdown components={components} remarkPlugins={[remarkFrontmatter]}>{children}</ReactMarkdown>;
};
