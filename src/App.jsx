import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./page/homePage/home";
import Projects from "./page/projects/Projects";
import TripTrace from "./page/projects/triptrace_pro/triptrace"
import HostedBadge from "./components/hostedBadge/hostedBadge";
import WipBadge from "./components/wipBadge/wipBadge";

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
      </Routes>

      <WipBadge />
      <HostedBadge />
    </BrowserRouter>
  );
}

export default App;