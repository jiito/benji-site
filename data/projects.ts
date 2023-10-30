export interface Project {
  name: string;
  description: string;
  href: string;
  featured: boolean;
  toolsUsed: String[];
}
export const projects: Array<Project> = [
  {
    name: "ChadGPT",
    description: "Your AI frat bro",
    href: "https://chadgpt.app",
    featured: false,
    toolsUsed: ["Twillio", "NextJS", "OpenAI"],
  },
  {
    name: "aspn",
    description: "Distributed network for hosting microservices",
    href: "/aspn",
    featured: true,
    toolsUsed: ["Rust", "GCP", "PostgresQL", "WebAssembly"],
  },
  {
    name: "Post Roe Co",
    description:
      "Post Roe Co is providing visibility into corporations a post roe society",
    href: "https://post-roe.super.site/",
    featured: true,
    toolsUsed: ["Notion", "Super.so"],
  },
  {
    name: "Javascript Ray Tracer",
    description: "Basic raytracer with bounding-volume hierarchy ",
    href: "https://jiito.github.io/raytracer-js/",
    featured: true,
    toolsUsed: ["Javascript", "gl-matrix"],
  },
  {
    name: "gci",
    description: "Git Checkout Interactive Rust command line tool",
    href: "https://github.com/jiito/gci",
    featured: true,
    toolsUsed: ["Rust", "Github Workflows"],
  },
  {
    name: "Solana Auth",
    description: "Open source authentication package for Solana wallets",
    href: "https://github.com/crossmint/solana-auth",
    featured: true,
    toolsUsed: ["Next.js", "Solana Wallet Adapter", "Lerna"],
  },
];
