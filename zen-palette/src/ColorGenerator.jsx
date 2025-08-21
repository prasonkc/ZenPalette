import { useEffect, useState } from "react";

function Card() {
  const [color, setColor] = useState("");
  const [isFinal, setIsFinal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let interval;
    if (!isFinal) {
      interval = setInterval(() => {
        setColor(generateRandomHexColor());
      }, 50);
    }

    function handleKeyDown(event) {
      if (event.code === "Space") {
        lockColor();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFinal]);

  function lockColor() {
    setColor(generateRandomHexColor());
    setIsFinal(true);
  }

  return (
    <>
      <div
        className="relative card w-[18vw] h-[75vh] rounded-3xl shadow-2xl cursor-pointer flex items-center justify-center 
                   transition-transform duration-300 hover:scale-105 hover:shadow-3xl"
        style={{ background: color}}
        onClick={handleBoxClick}
      >
        <span
          className="absolute bottom-6 px-4 py-2 bg-black/40 backdrop-blur-md text-lg font-mono tracking-wider 
                     text-white rounded-lg cursor-pointer hover:bg-black/60 transition"
          onClick={handleSpanClick}
        >
          {color.toUpperCase()}
        </span>
      </div>

      {copied && (
        <div
          className="bg-black text-white px-3 py-2 rounded-lg text-sm shadow-lg animate-fadeInOut"
          style={{
            position: "fixed",
            left: popupPos.x + 15 + "px",
            top: popupPos.y + 15 + "px",
            pointerEvents: "none",
            zIndex: 999,
          }}
        >
          Copied!
        </div>
      )}
    </>
  );

  function handleBoxClick() {
    lockColor();
  }

  function handleSpanClick(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(color.toUpperCase());
    setPopupPos({ x: e.clientX, y: e.clientY });
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
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
    <div className="paletteGenerator w-full h-screen 
                     m-auto p-10 flex justify-center items-center gap-8">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
