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
        if (event.code == "Space") {
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
          className="card w-[20vw] h-[85vh] rounded-3xl shadow-2xl cursor-pointer flex justify-center"
          style={{ background: color }}
          onClick={handleBoxClick}
        >
          <span
            className="text-2xl font-sans text-white border-b-1 h-10 w-full text-center"
            onClick={handleSpanClick}
          >
            {color.toUpperCase()}
          </span>
        </div>

        {copied && (
        <div
          className="bg-black text-white px-2 py-1 rounded text-sm"
          style={{
            position: "fixed",
            left: popupPos.x + 10 + "px",
            top: popupPos.y + 10 + "px", 
            pointerEvents: "none",       
            zIndex: 999,
          }}
        >
          Copied to clipboard!
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
      setCopied(true)
      setTimeout(() => setCopied(false), 300);
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
