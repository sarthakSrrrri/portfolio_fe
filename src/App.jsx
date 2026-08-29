import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./page/homePage/home";
import Projects from "./page/projects/Projects";
import TripTrace from "./page/projects/triptrace_pro/triptrace"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/projects" element={<Projects />} />

        <Route
          path="/projects/triptrace"
          element={<TripTrace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;