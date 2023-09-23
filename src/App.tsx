import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { NavBarComponent } from "./components/NavBarComponent";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Tracker } from "./pages/Tracker";
import { Leaderboard } from "./pages/Leaderboard";
import Background from "./assets/bg.svg";

function App() {
  return (
    <>
      <div className="">
        <NavBarComponent />
        <div className="mt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
        <Background />
      </div>
    </>
  );
}

export default App;
