import "./App.css";
import { NavBarComponent } from "./components/NavBarComponent";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Tracker } from "./pages/Tracker";
import { Leaderboard } from "./pages/Leaderboard";

function App() {
  return (
    <>
      <div className="bg-white/80">
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
