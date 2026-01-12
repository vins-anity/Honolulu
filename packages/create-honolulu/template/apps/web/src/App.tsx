import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { queryClient } from "./lib/client";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto space-y-8">
                    <header className="text-center space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                            <span className="text-rose-500">Honolulu</span> Todos
                        </h1>
                        <p className="text-slate-500">
                            Full-stack monorepo starter with Hono, React & Drizzle
                        </p>
                    </header>

                    <main className="space-y-8">
                        <AddTodo />
                        <TodoList />
                    </main>

                    <footer className="text-center text-sm text-slate-400">
                        Built with 🌺 Honolulu
                    </footer>
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
