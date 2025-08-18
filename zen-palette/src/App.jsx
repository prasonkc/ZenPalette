import { useState } from "react";
import "./App.css";

function NavBar() {
  return (
    <>
      <div className="nav grid grid-cols-[80vw_10vw_10vw] font-bold font-mono text-xl">
        <div className="flex justify-center justify-self-center">
          <div className="palleteGen cursor-pointer hover:underline hover:bg-[#ffd6ba65]  p-5">
            Colour Palette Generator
          </div>
          <div className="imagePick cursor-pointer hover:underline hover:bg-[#ffd6ba65]  p-5">
            Image Picker
          </div>
        </div>
        {/* Section for toggling light mode and dark mode */}
        <div className="toggleBtn justify-self-center cursor-pointer p-5">
          .../...
        </div>
        {/* About Me Section */}
        <div className="aboutMe justify-self-center cursor-pointer  p-5">*</div>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <NavBar/>

      <div className="palleteContainer">
        {/* Use react router here */}
        {/* Generate 5 cards for picking colour */}
      </div>
    </>
  );
}

export default App;
