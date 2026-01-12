import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { useTodoStore } from "../store/useTodoStore";
import { TodoItem } from "./TodoItem";

export function TodoList() {
    const { filter, setFilter } = useTodoStore();
    const {
        data: todos,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["todos"],
        queryFn: api.todos.list,
    });

    const filteredTodos = todos?.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-500 rounded-lg text-center">
                Failed to load todos
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters (Zustand Demo) */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg w-fit mx-auto">
                {(["all", "active", "completed"] as const).map((f) => (
                    <button
                        type="button"
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                            filter === f
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filteredTodos?.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        No {filter === "all" ? "" : filter} todos found
                    </div>
                ) : (
                    filteredTodos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                )}
            </div>
        </div>
    );
}
