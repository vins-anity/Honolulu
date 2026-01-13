import { Command } from "cmdk";
import { File, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type SidebarGroup, type SidebarLink, sidebarLinks } from "../config/docs";

export function CommandMenu() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		const openElements = document.querySelectorAll("[data-command-trigger]");
		const handleTrigger = () => setOpen(true);
		openElements.forEach((el) => {
			el.addEventListener("click", handleTrigger);
		});

		document.addEventListener("keydown", down);
		return () => {
			document.removeEventListener("keydown", down);
			openElements.forEach((el) => {
				el.removeEventListener("click", handleTrigger);
			});
		};
	}, []);

	const runCommand = (command: () => void) => {
		setOpen(false);
		command();
	};

	return (
		<Command.Dialog
			open={open}
			onOpenChange={setOpen}
			label="Global Command Menu"
			className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl shadow-slate-900/50 p-0 z-[100] backdrop-blur-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
			onClick={(_e) => {
				// Prevent click on dialog content from closing if we had an overlay click handler (cmdk handles overlay usually)
			}}
		>
			<div className="flex items-center border-b border-slate-800 px-3 pl-4">
				<Search className="w-5 h-5 text-slate-500 mr-2" />
				<Command.Input
					placeholder="Type a command or search..."
					className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 text-white"
				/>
			</div>
			<Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-800">
				<Command.Empty className="py-6 text-center text-sm text-slate-500">
					No results found.
				</Command.Empty>

				{sidebarLinks.map((section) => {
					// Recursive function to get all links from a group/section
					const getAllLinks = (
						items: (SidebarGroup | SidebarLink)[],
						groupTitle: string,
					): { title: string; href: string; group: string }[] => {
						return items.flatMap((item) => {
							if ("items" in item) {
								return getAllLinks(item.items, `${groupTitle} > ${item.title}`);
							}
							return [{ title: item.title, href: item.href, group: groupTitle }];
						});
					};

					const links = getAllLinks(section.items, section.title);

					if (links.length === 0) return null;

					return (
						<Command.Group
							key={section.title}
							heading={section.title}
							className="text-slate-500 px-2 py-1.5 text-xs font-medium text-muted-foreground mb-1 select-none"
						>
							{links.map((link) => (
								<Command.Item
									key={link.href}
									onSelect={() => runCommand(() => navigate(link.href))}
									className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-rose-500/10 aria-selected:text-rose-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-slate-300 transition-colors"
								>
									<File className="mr-2 h-4 w-4 opacity-50" />
									<span className="opacity-50 mr-2 text-xs uppercase tracking-wider hidden sm:inline-block">
										{link.group}
									</span>
									{link.title}
								</Command.Item>
							))}
						</Command.Group>
					);
				})}
			</Command.List>
			<div className="border-t border-slate-800 px-4 py-2 text-xs text-slate-500 flex justify-between">
				<span>Search Documentation</span>
				<span className="flex gap-1">
					<kbd className="bg-slate-800 px-1 rounded border border-slate-700">ESC</kbd> to close
				</span>
			</div>
		</Command.Dialog>
	);
}
