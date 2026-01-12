import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { DocsLayout } from "./layouts/DocsLayout";
import { Introduction } from "./pages/docs/Introduction";
import { Installation } from "./pages/docs/Installation";
import { Structure } from "./pages/docs/Structure";
import { TechStack } from "./pages/docs/TechStack";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="/docs/introduction" replace />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="installation" element={<Installation />} />
          <Route path="structure" element={<Structure />} />
          <Route path="tech-stack" element={<TechStack />} />
          <Route path="*" element={<div className="p-8 text-slate-400">Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
