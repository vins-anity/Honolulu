export type SidebarLink = {
    title: string;
    href: string;
};

export type SidebarGroup = {
    title: string;
    items: (SidebarGroup | SidebarLink)[];
};

export type SidebarSection = {
    title: string;
    items: (SidebarGroup | SidebarLink)[];
};

export const sidebarLinks: SidebarSection[] = [
    {
        title: "Documentation",
        items: [
            {
                title: "Getting Started",
                items: [
                    { title: "Get Started", href: "/docs/get-started" },
                    { title: "Why Honolulu?", href: "/docs/why-honolulu" },
                    { title: "Project Structure", href: "/docs/structure" },
                ]
            },
            {
                title: "Guides",
                items: [
                    { title: "Authentication", href: "/docs/guides/auth" },
                    { title: "Database & Drizzle", href: "/docs/guides/database" },
                    { title: "Environment Variables", href: "/docs/guides/env" },
                    { title: "Testing", href: "/docs/guides/testing" },
                    { title: "OpenAPI & Docs", href: "/docs/guides/openapi" },
                ]
            },
            {
                title: "Reference",
                items: [
                    { title: "Web (Frontend)", href: "/docs/packages/web" },
                    { title: "API (Backend)", href: "/docs/packages/api" },
                    { title: "Shared (Schemas)", href: "/docs/packages/shared" },
                ]
            },
            {
                title: "Deployment",
                items: [
                    {
                        title: "Web",
                        items: [
                            { title: "Vercel", href: "/docs/deployment/vercel" },
                        ]
                    },
                    {
                        title: "API",
                        items: [
                            { title: "Railway", href: "/docs/deployment/railway" },
                            { title: "Fly.io", href: "/docs/deployment/flyio" },
                            { title: "Cloudflare Workers", href: "/docs/deployment/cf-workers" },
                        ]
                    },
                    {
                        title: "Shared",
                        items: [
                            { title: "Docker / VPS", href: "/docs/deployment/docker" },
                        ]
                    },
                ],
            },
        ],
    },
];
