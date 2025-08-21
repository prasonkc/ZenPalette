import clsx from "clsx";
import { useState } from "react";

export default function ImagePicker({ isDark }) {
  const [file, setFile] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  function handleDrop(e){
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]

    if(!droppedFile){
      return
    }

    if (!droppedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    setFile(droppedFile)
    setIsOpen(true)
  }

  function handleDragOver(e){
    e.preventDefault()
  }

  return (
    <>
      {!file && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={clsx(
            "dropZone flex justify-center items-center w-[50vh] h-[50vh] bg-gray-100 m-auto rounded-3xl cursor-pointer shadow-2xl shadow-purple-700",
            isDark ? "" : "text-black"
          )}
        >
          Select or drop an image
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
