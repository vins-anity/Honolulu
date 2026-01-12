import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Circle, Trash2 } from "lucide-react";
import type { Todo } from "shared";
import { api } from "../lib/api";

export function TodoItem({ todo }: { todo: Todo }) {
    const queryClient = useQueryClient();

    const toggleMutation = useMutation({
        mutationFn: () => api.todos.toggle(todo.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });

    const deleteMutation = useMutation({
        mutationFn: () => api.todos.delete(todo.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });

    return (
        <div className="group flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <button
                type="button"
                onClick={() => toggleMutation.mutate()}
                disabled={toggleMutation.isPending}
                className="flex-shrink-0 text-slate-400 hover:text-rose-500 transition-colors"
            >
                {todo.completed ? (
                    <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4" />
                    </div>
                ) : (
                    <Circle className="w-6 h-6" />
                )}
            </button>

            <span
                className={`flex-1 text-lg ${
                    todo.completed ? "text-slate-400 line-through" : "text-slate-700"
                }`}
            >
                {todo.title}
            </span>

            <button
                type="button"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all"
                aria-label="Delete todo"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
