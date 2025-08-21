import clsx from "clsx";

export default function ImagePicker({isDark}){
    return <>
        <div className={clsx("dropZone flex justify-center items-center w-[50vh] h-[50vh] bg-gray-100 m-auto rounded-3xl cursor-pointer shadow-2xl shadow-purple-700", isDark ? "" : "text-black")}>
            Click or drop your image
        </div>
    </>
}