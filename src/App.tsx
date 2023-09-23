import "./App.css";
import { NavBarComponent } from "./components/NavBarComponent";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Tracker } from "./pages/Tracker";
import { Leaderboard } from "./pages/Leaderboard";
import { default as Background } from "./assets/bg.svg";

function App() {
  return (
    <>
      <div
        className="relative"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <NavBarComponent />
        <div className="mt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
