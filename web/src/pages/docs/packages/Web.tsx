import { Terminal, Code2, FileCode, Folder, ArrowRight, ExternalLink, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../../components/CodeBlock";

export function PackageWeb() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Web (Frontend)</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    The <code className="text-rose-400 bg-black/30 px-1.5 py-0.5 rounded">apps/web</code> package is the React frontend,
                    built with <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">Vite</a> and{" "}
                    <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">Tailwind CSS v4</a>.
                </p>
            </div>

            {/* Directory Structure */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Folder className="w-6 h-6 text-blue-400" />
                    Directory Structure
                </h2>
                <CodeBlock
                    code={`apps/web/
├── src/
│   ├── main.tsx          # React entry point
│   ├── App.tsx           # Root component & routes
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   └── docs/         # Documentation pages
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities (API client, etc.)
│   └── index.css         # Global styles + Tailwind
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
└── package.json`}
                    language="text"
                    filename="apps/web/"
                />
            </section>

            {/* Key Commands */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-teal-400" />
                    Key Commands
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Development Server</h3>
                        <CodeBlock code="bun run dev" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Hot reload at <code>localhost:5173</code></p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Production Build</h3>
                        <CodeBlock code="bun run build" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Outputs to <code>dist/</code></p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Preview Build</h3>
                        <CodeBlock code="bun run preview" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Serves production build locally</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Lint & Format</h3>
                        <CodeBlock code="bun run lint" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Uses Biome (not ESLint)</p>
                    </div>
                </div>
            </section>

            {/* Creating an API Client */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-purple-400" />
                    Connecting to the API
                </h2>
                <p className="text-slate-400">
                    Create an API client in <code className="text-purple-400">src/lib/api.ts</code>:
                </p>
                <CodeBlock
                    filename="src/lib/api.ts"
                    language="typescript"
                    code={`const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchTodos() {
    const res = await fetch(\`\${API_URL}/todos\`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
}

export async function createTodo(data: { title: string }) {
    const res = await fetch(\`\${API_URL}/todos\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}`}
                />
            </section>

            {/* Using Shared Schemas */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    Client-Side Validation
                </h2>
                <p className="text-slate-400">
                    Use the same Valibot schemas from <code className="text-yellow-400">shared</code> for frontend validation:
                </p>
                <CodeBlock
                    filename="components/TodoForm.tsx"
                    language="tsx"
                    code={`import * as v from "valibot";
import { CreateTodoSchema, type CreateTodo } from "shared";

function TodoForm({ onSubmit }: { onSubmit: (data: CreateTodo) => void }) {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const raw = Object.fromEntries(formData);
        
        const result = v.safeParse(CreateTodoSchema, raw);
        
        if (result.success) {
            setError(null);
            onSubmit(result.output);
        } else {
            setError(result.issues[0].message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="New todo..." />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit">Add</button>
        </form>
    );
}`}
                />
            </section>

            {/* Data Fetching with TanStack Query */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FileCode className="w-6 h-6 text-orange-400" />
                    Data Fetching (TanStack Query)
                </h2>
                <p className="text-slate-400">
                    Use <a href="https://tanstack.com/query" target="_blank" rel="noreferrer" className="text-orange-400 hover:underline">TanStack Query</a> for server state management:
                </p>
                <CodeBlock
                    filename="hooks/useTodos.ts"
                    language="typescript"
                    code={`import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, createTodo } from "../lib/api";

export function useTodos() {
    return useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });
}

export function useCreateTodo() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
}`}
                />
            </section>

            {/* Client State with Zustand */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    Client State (Zustand)
                </h2>
                <p className="text-slate-400">
                    Use <a href="https://zustand-demo.pmnd.rs/" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">Zustand</a> for simple,
                    performant client-side state (UI state, user preferences, etc.):
                </p>
                <CodeBlock
                    filename="stores/useUIStore.ts"
                    language="typescript"
                    code={`import { create } from "zustand";

interface UIState {
    sidebarOpen: boolean;
    theme: "light" | "dark";
    toggleSidebar: () => void;
    setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: false,
    theme: "dark",
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setTheme: (theme) => set({ theme }),
}));

// Usage in component
function Header() {
    const { sidebarOpen, toggleSidebar } = useUIStore();
    
    return (
        <button onClick={toggleSidebar}>
            {sidebarOpen ? "Close" : "Open"} Menu
        </button>
    );
}`}
                />
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <p className="text-yellow-300 text-sm">
                        <strong>Best Practice:</strong> Use Zustand for client-only state (UI, forms).
                        Use TanStack Query for server state (API data). Don't mix them!
                    </p>
                </div>
            </section>

            {/* Environment Variables */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Environment Variables</h2>
                <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                    <p className="text-teal-300 text-sm mb-3">
                        Create <code className="bg-black/30 px-1 rounded">.env.local</code> for local overrides:
                    </p>
                    <CodeBlock code="VITE_API_URL=http://localhost:3000" language="bash" />
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <p className="text-amber-300 text-sm">
                        <strong>Important:</strong> Vite exposes env vars that start with <code className="bg-black/30 px-1 rounded">VITE_</code> to client code.
                        Never put secrets in <code>VITE_</code> prefixed variables!
                    </p>
                </div>
            </section>

            {/* Deployment */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Deployment</h2>
                <p className="text-slate-400 mb-4">Deploy the frontend to any static hosting:</p>
                <div className="flex flex-wrap gap-3">
                    <Link to="/docs/deployment/vercel" className="px-4 py-2 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-300 hover:bg-rose-500/30 transition-colors">
                        Vercel →
                    </Link>
                </div>
            </section>
        </div>
    );
}
