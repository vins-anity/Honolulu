import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/api";

export function AddTodo() {
    const [title, setTitle] = useState("");
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: api.todos.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            setTitle("");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        mutate({ title, description: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                disabled={isPending}
            />
            <button
                type="submit"
                disabled={isPending || !title.trim()}
                className="px-4 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Plus className="w-5 h-5" />
            </button>
        </form>
    );
}
