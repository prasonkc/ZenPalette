import clsx from "clsx";
import { useRef, useState } from "react";

export default function ImagePicker({ isDark }) {
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pickedColor, setPickedColor] = useState(null);
  const canvasRef = useRef(null);
  const bufferRef = useRef(null);
  const drawRef = useRef(null);
  const inputRef = useRef(null);

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

  return (
    <>
      {!file && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={browse}
          className="dropZone flex justify-center items-center w-[50vh] h-[50vh] m-auto rounded-3xl cursor-pointer shadow-2xl shadow-white-700"
        >
          Select or drop an image
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileInput}
            style={{ display: "none" }}
          />
        </div>
      )}
      {file && (
        <div className="flex justify-center items-center w-full h-[90vh] m-auto">
          <img
            src={URL.createObjectURL(file)}
            alt=""
            className="object-contain w-full h-full"
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>
      )}
    </>
  );
}
