import { useQuery } from "@tanstack/react-query";
import {
  Zap,
  Terminal,
  Code2,
  Rocket,
  Github,
  Coffee,
  ArrowRight
} from "lucide-react";
import { useAppStore } from "./lib/store";
import TropicalIsland from "./assets/Tropical-island.svg";

function App() {
  const { count, increment } = useAppStore();

  const { data: serverData } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/");
        return await res.json();
      } catch (err) {
        return { message: "Server sleeping 😴" };
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-rose-500 selection:text-white font-sans">

      {/* Navigation */}
      <nav className="absolute top-0 w-full z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
          <span className="text-2xl">🌺</span> Honolulu
        </div>
        <a
          href="https://github.com/stevedylandev/bhvr"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-sm font-medium"
        >
          <Github className="w-4 h-4" />
          <span>Star on GitHub</span>
        </a>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px]"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-rose-500 rounded-full mix-blend-multiply filter blur-[128px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-0">

          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wide border border-rose-500/20">
              <Rocket className="w-3 h-3" />
              <span>v1.0.0 Ready for liftoff</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              The Turbocharged <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                Monorepo Starter
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-lg leading-relaxed">
              Stop fighting configuration files. Start shipping your dream product.
              Powered by <span className="text-white font-semibold">Bun</span>, <span className="text-white font-semibold">Hono</span>, and <span className="text-white font-semibold">React</span>.
              It's fast. Like, <i>really</i> fast.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={increment}
                className="group relative px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span className="absolute -top-3 -right-3 px-2 py-0.5 bg-rose-500 text-white text-[10px] rounded-full">
                  Clicks: {count}
                </span>
              </button>

              <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                <div className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <code className="text-sm font-mono text-slate-300">
                  API Status: <span className="text-green-400">{serverData?.message || "Checking..."}</span>
                </code>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 rounded-3xl blur-2xl transform rotate-6 scale-95 group-hover:rotate-3 transition-transform duration-500"></div>
            <div className="relative bg-slate-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={TropicalIsland}
                alt="Chill Vibes"
                className="w-full h-auto drop-shadow-2xl"
              />

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#1e293b] p-4 rounded-xl border border-slate-700 shadow-xl flex flex-col gap-2">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Speed Score</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">100</span>
                  <span className="text-rose-500 text-sm font-bold">/100</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Feature Grid */}
      <section className="py-24 px-6 border-t border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Blazingly Fast", desc: "Bun runtime + SWC + Tailwind v4. Blink and you'll miss the build time." },
              { icon: Code2, title: "Full-Stack Types", desc: "End-to-end type safety with shared schemas. API and Web speak the same language." },
              { icon: Terminal, title: "Developer Joy", desc: "Minimal config. Hono is standard-compliant. React is... well, React. But faster." }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-rose-500/20 rounded-lg flex items-center justify-center mb-4 text-rose-400">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-500 text-sm">
        <p className="flex items-center justify-center gap-2">
          Built with <Coffee className="w-3 h-3 text-amber-500" /> and
          <span className="font-bold text-slate-300">Honolulu</span>
        </p>
      </footer>

    </div>
  );
}

export default App;
