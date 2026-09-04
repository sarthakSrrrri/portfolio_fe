import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./page/homePage/home";
import Projects from "./page/projects/Projects";
import TripTrace from "./page/projects/triptrace_pro/triptrace"
import HumanoidRobotPage from "./page/projects/reinforcement_ai/re_ai";
import VectorDbPlayground from "./page/projects/similarity_search/ss_vector_db";
import HostedBadge from "./components/hostedBadge/hostedBadge";
import WipBadge from "./components/wipBadge/wipBadge";
import AiChatWidget from "./components/aiChatWidget/aiChatWidget";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/projects" element={<Projects />} />

        <Route
          path="/projects/Statistical Pattern Analysis & Anomaly Detection on 10.9M NYC Taxi Trips"
          element={<TripTrace />}
        />

        <Route path="/projects/reinforcement-ai" element={<HumanoidRobotPage />} />

        <Route path="/projects/similarity-search" element={<VectorDbPlayground />} />
      </Routes>

      <WipBadge />
      <HostedBadge />
      <AiChatWidget />
    </BrowserRouter>
  );
}

export default App;