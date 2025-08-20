import { useEffect, useState } from "react";

function Card() {
  const [color, setColor] = useState("#fff");
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code == "Space") {
        setColor(generateRandomHexColor());
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div
        className="card w-[20vw] h-[85vh] bg-[#fff] rounded-3xl shadow-2xl cursor-pointer"
        style={{ background: color }}
        onClick={handleClick}
      ></div>
    </>
  );

  function handleClick() {
    setColor(generateRandomHexColor());
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
