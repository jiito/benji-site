export interface Project {
    name: string
    description: string
    href: string
    featured: boolean
    toolsUsed: String[]
}

export const projects: Array<Project> = [
    {
        name: 'Post Roe Co',
        description: "Post Roe Co is providing visibility into corporations a post roe society",
        href: "https://postroe.co",
        featured: true,
        toolsUsed: ["Notion", "Super.so",]
    },
    {
        name: 'gci',
        description: "Git Checkout Interactive Rust command line tool",
        href: "https://github.com/jiito/gci",
        featured: true,
        toolsUsed: ["Rust", "Github Workflows",]
    },
    {
        name: 'Solana Auth',
        description: "Sign",
        href: "https://github.com/crossmint/solana-auth",
        featured: true,
        toolsUsed: ["Next.js", "Solana Wallet Adapter", "Lerna",]
    },
]
