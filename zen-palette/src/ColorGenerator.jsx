import { useEffect, useState } from "react";

function Card() {
  const [color, setColor] = useState("");
  const [isFinal, setIsFinal] = useState(false)
  
  useEffect(() => {
    let interval;
    if(!isFinal){
      interval = setInterval(() => {
        setColor(generateRandomHexColor())
      }, 50);
    }

    function handleKeyDown(event) {
      if (event.code == "Space") {
        lockColor();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFinal]);

  
  function lockColor() {
    setColor(generateRandomHexColor());
    setIsFinal(true); // stop flickering
  }


  return (
    <>
      <div
        className="card w-[20vw] h-[85vh] rounded-3xl shadow-2xl cursor-pointer"
        style={{ background: color }}
        onClick={handleClick}
      ></div>
    </>
  );

  function handleClick() {
    lockColor()
  }
}

function generateRandomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

export default function ColorGenerator() {
  return (
    <>
      <div className="paletteGenerator w-[95vw] h-full bg-[#FFDCDC] rounded-3xl m-auto pl-10 pt-7 pb-7 pr-10 flex gap-10">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
