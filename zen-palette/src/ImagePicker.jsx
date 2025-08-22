import { useEffect, useRef, useState } from "react";

export default function ImagePicker({ isDark }) {
  const [file, setFile] = useState(null);
  const [pickedColor, setPickedColor] = useState(null);
  const inputRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) {
      return;
    }

    if (!droppedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    setFile(droppedFile);
    setIsOpen(true);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function browse() {
    inputRef.current?.click();
  }

  function onFileInput(e) {
    const browsedFile = e.target.files?.[0];
    if (!browsedFile) {
      return;
    }

    if (!browsedFile.type.startsWith("image/")) {
      alert("Please select a valid image file");
      setFile(null);
      return;
    }

    setFile(browsedFile);
    e.target.value = "";
  }

  function handleImageLoad() {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  }

  function handleImageClick(e) {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const rect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const colorRGB = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    const color = convertToHex(colorRGB)
    setPickedColor(color);
    setPopupPos({ x: e.clientX, y: e.clientY });
    navigator.clipboard.writeText(color)
  }

function convertToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result) return "#000000"; 
  const [r, g, b] = result.map(Number);

  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  ).toUpperCase();
}


  return (
    <>
      {!file && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("fileInput").click()}
          className="dropZone flex justify-center items-center w-[50vh] h-[50vh] m-auto rounded-3xl cursor-pointer shadow-2xl shadow-white-700"
        >
          Select or drop an image
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={onFileInput}
            style={{ display: "none" }}
          />
        </div>
      )}
      {file && (
        <>
          <img
            ref={imgRef}
            src={URL.createObjectURL(file)}
            alt="Picked"
            onLoad={handleImageLoad}
            onClick={handleImageClick}
            className="max-w-full max-h-[90vh] object-contain cursor-crosshair rounded-xl shadow-md"
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {pickedColor && (
            <div
              className="fixed px-2 py-1 rounded text-sm font-bold text-white"
              style={{
                left: popupPos.x + 10 + "px",
                top: popupPos.y + 10 + "px",
                backgroundColor: pickedColor,
                pointerEvents: "none",
                zIndex: 999,
                transition: "all 0.2s ease",
              }}
            >
              {pickedColor}
            </div>
          )}
        </>
      )}
    </>
  );
}
