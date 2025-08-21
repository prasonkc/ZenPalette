import { useState } from "react";
import "./App.css";
import clsx from "clsx";
import sunIcon from "./assets/toggle/sun.svg";
import moonIcon from "./assets/toggle/moon.svg";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ColorGenerator from "./ColorGenerator";
import ImagePicker from "./ImagePicker";
import About from "./about";

function NavBar({ isDark, setIsDark }) {
  return (
    <nav
      className={clsx(
        "w-full shadow-md sticky top-0 z-50",
        isDark ? "bg-[#181818] text-gray-200" : "bg-white text-gray-800"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left navigation links */}
        <div className="flex gap-8 font-bold font-mono text-lg justify-start">
          <Link
            to="/color-generator"
            className="hover:text-red-500 hover:border-b-2 hover:border-red-500 pb-1 transition-colors"
          >
            Colour Palette Generator
          </Link>
          <Link
            to="/image-picker"
            className="hover:text-red-500 hover:border-b-2 hover:border-red-500 pb-1 transition-colors" isDark={isDark}
          >
            Image Picker
          </Link>
        </div>

        {/* Right side: toggle + about */}
        <div className="flex items-center gap-6">
          <ToggleButton isDark={isDark} setIsDark={setIsDark} />

          <Link to="/about">
            <div className="border-2 border-dotted rounded-full h-10 w-10 flex justify-center items-center opacity-70 hover:opacity-100 hover:border-red-500 hover:text-red-500 transition">
              i
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function ToggleButton({ isDark, setIsDark }) {
  return (
    <>
      <div
        onClick={() => handleClick()}
        className={clsx(
          "w-18 h-10 rounded-full cursor-pointer flex items-center opacity-75 hover:opacity-100",
          isDark ? "bg-indigo-200" : "bg-amber-200"
        )}
      >
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center transition-transform ease-in-out duration-300",
            isDark
              ? "translate-x-full bg-amber-200"
              : "translate-x-0 bg-indigo-200"
          )}
        >
          <img src={isDark ? moonIcon : sunIcon} alt="" className="w-8" />
        </div>
      </div>
    </>
  );
  function handleClick() {
    setIsDark(!isDark);
  }
}

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <BrowserRouter>
        <div
          className={clsx(
            "min-h-screen flex flex-col transition-colors duration-300",
            isDark ? "bg-[#474141] text-gray-200" : "bg-purple-200 text-gray-800"
          )}
        >
          {" "}
          <NavBar isDark={isDark} setIsDark={setIsDark} />
          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/color-generator" replace />}
            />
            <Route path="/color-generator" element={<ColorGenerator />} />
            <Route path="/image-picker" element={<ImagePicker />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
