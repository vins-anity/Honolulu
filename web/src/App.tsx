import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { DocsLayout } from "./layouts/DocsLayout";
import { GetStarted } from "./pages/docs/GetStarted";
import { WhyHonolulu } from "./pages/docs/WhyHonolulu";
import { Structure } from "./pages/docs/Structure";
import { Deployment } from "./pages/docs/Deployment";
import {
  DeployVercel,
  DeployRailway,
  DeployFlyio,
  DeployCfWorkers,
  DeployDocker
} from "./pages/docs/deployment/index";
import {
  PackageWeb,
  PackageApi,
  PackageShared
} from "./pages/docs/packages/index";
import {
  GuideEnv,
  GuideDatabase,
  GuideTesting,
  GuideAuth
} from "./pages/docs/guides/index";
import { OpenApiGuide } from "./pages/docs/guides/OpenApi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="/docs/get-started" replace />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="why-honolulu" element={<WhyHonolulu />} />
          <Route path="structure" element={<Structure />} />
          <Route path="deployment" element={<Deployment />} />
          {/* Guides */}
          <Route path="guides/env" element={<GuideEnv />} />
          <Route path="guides/database" element={<GuideDatabase />} />
          <Route path="guides/testing" element={<GuideTesting />} />
          <Route path="guides/auth" element={<GuideAuth />} />
          <Route path="guides/openapi" element={<OpenApiGuide />} />
          {/* Deployment pages */}
          <Route path="deployment/vercel" element={<DeployVercel />} />
          <Route path="deployment/railway" element={<DeployRailway />} />
          <Route path="deployment/flyio" element={<DeployFlyio />} />
          <Route path="deployment/cf-workers" element={<DeployCfWorkers />} />
          <Route path="deployment/docker" element={<DeployDocker />} />
          {/* Package documentation */}
          <Route path="packages/web" element={<PackageWeb />} />
          <Route path="packages/api" element={<PackageApi />} />
          <Route path="packages/shared" element={<PackageShared />} />
          <Route path="*" element={<div className="p-8 text-slate-400">Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
