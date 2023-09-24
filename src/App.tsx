import "./App.css";
import { NavBarComponent } from "./components/NavBarComponent";
import { Home } from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { Tracker } from "./pages/Tracker";
import { Leaderboard } from "./pages/Leaderboard";
import { default as Background } from "./assets/bg2.svg";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div
        className="relative"
        style={{
          // backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
      >
        <NavBarComponent />
        <div className="mt-12">
          <Routes location={location} key={location.pathname}>
            <Route path="/" Component={Home} />
            <Route path="/tracker" Component={Tracker} />
            <Route path="/leaderboard" Component={Leaderboard} />
          </Routes>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default App;
