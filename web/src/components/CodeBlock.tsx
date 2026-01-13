import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
	code: string;
	language?: string;
	filename?: string;
}

export function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
	return (
		<div className="rounded-xl overflow-hidden border border-slate-800">
			{filename && (
				<div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
					<div className="flex gap-1.5">
						<span className="w-3 h-3 rounded-full bg-rose-500/50" />
						<span className="w-3 h-3 rounded-full bg-yellow-500/50" />
						<span className="w-3 h-3 rounded-full bg-green-500/50" />
					</div>
					<span className="text-xs text-slate-500 font-mono ml-2">{filename}</span>
				</div>
			)}
			<Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre
						className="p-4 overflow-x-auto text-sm font-mono"
						style={{ ...style, background: "rgba(15, 23, 42, 0.8)" }}
					>
						{tokens.map((line, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: tokens have no stable id
							<div key={i} {...getLineProps({ line })}>
								<span className="text-slate-600 select-none w-8 inline-block text-right mr-4">
									{i + 1}
								</span>
								{line.map((token, key) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: tokens have no stable id
									<span key={key} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</div>
	);
}
