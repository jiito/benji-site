export interface Project {
  name: string;
  description: string;
  href: string;
  featured: boolean;
  toolsUsed: string[];
}
export const projects: Array<Project> = [
  {
    name: "Particle Text",
    description: "Animated text using vertex shaders",
    href: "https://particle-text-beta.vercel.app/",
    featured: true,
    toolsUsed: ["@react-three/fiber", "Typescript"],
  },
  {
    name: "Transforming Our DNA - Genotyping Structural Variants Using Vision Transformers (ViT)",
    description: "Undergraduate Computer Science Thesis",
    href: "/thesis.pdf",
    featured: true,
    toolsUsed: ["Python", "Vision Transformers"],
  },
  {
    name: "AirBnb Infinite Scroll",
    description: "Infinite scroll clone of AirBnb using plain HTML/CSS/JS",
    href: "https://scroll-tawny.vercel.app/",
    featured: false,
    toolsUsed: ["Unsplash API", "React"],
  },
  {
    name: "eddy",
    description:
      "Semantic real-time mind mapping. Best NLP hack at Stanford Treehacks 2023",
    href: "https://devpost.com/software/eddy-zx9uto",
    featured: true,
    toolsUsed: [
      "chakra-ui",
      "fastapi",
      "figma",
      "huggingface",
      "nltk",
      "openai",
      "python",
      "react",
      "react-flow",
    ],
  },
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
