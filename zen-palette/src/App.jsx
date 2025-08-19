import { useState } from "react";
import "./App.css";
import clsx from "clsx"
import sunIcon from './assets/toggle/sun.svg'; 
import moonIcon from './assets/toggle/moon.svg'; 

function NavBar() {
  const[isDark, setIsDark] = useState(false)
  return (
    <>
      <div className="nav grid grid-cols-[80vw_10vw_10vw] font-bold font-mono text-xl">
        <div className="flex justify-center justify-self-center">
          <div className="palleteGen cursor-pointer hover:border-b-2 hover:border-gray-800 hover:text-gray-800 p-5">
            Colour Palette Generator
          </div>
          <div className="imagePick cursor-pointer hover:border-b-2 hover:border-gray-800 hover:text-gray-800  p-5">
            Image Picker
          </div>
        </div>
        {/* Section for toggling light mode and dark mode */}
        <div className="toggleBtn cursor-pointer self-center justify-self-center">
          <ToggleButton isDark={isDark} setIsDark={setIsDark}/>
        </div>
        {/* About Me Section */}
        <div className="aboutMe cursor-pointer p-5 justify-self-end">
          <div className="border-3 rounded-full border-dotted h-10 w-10 flex justify-center items-center opacity-75 hover:opacity-100">i</div>
        </div>
      </div>
    </>
  );
}

function ToggleButton({isDark, setIsDark}){
  return <>
    <div onClick={() => handleClick()} className={clsx("w-18 h-10 rounded-full cursor-pointer flex items-center opacity-75 hover:opacity-100", isDark ? "bg-amber-50" : "bg-red-300")}>
      <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", isDark ? "translate-x-full bg-red-300 transition-transform ease-in-out duration-300" : "bg-amber-50 translate-x-0 transition-transform ease-in-out duration-300")}>
        <img src={isDark ? moonIcon : sunIcon } alt="" className="w-8"/>
      </div>
    </div>
  </>
  function handleClick(){
    setIsDark(!isDark);
  }
}

function App() {
  return (
    <>
      <NavBar />
      <div className="palleteContainer">
        {/* Use react router here */}
        {/* Generate 5 cards for picking colour */}
      </div>
    </>
  );
}

export default App;
