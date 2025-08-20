function Card({color}){
    return <>
        <div className="card w-[20vw] h-[85vh] bg-[#fff] rounded-3xl shadow-2xl" style={{background: color}}></div>
    </>
}

function generateRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export default function ColorGenerator(){
    return <>
        <div className="paletteGenerator w-[95vw] h-full bg-[#FFDCDC] rounded-3xl m-auto pl-10 pt-7 pb-7 pr-10 flex gap-10">
            <Card color = {generateRandomHexColor()}/>
            <Card color = {generateRandomHexColor()}/>
            <Card color = {generateRandomHexColor()}/>
            <Card color = {generateRandomHexColor()}/>
            <Card color = {generateRandomHexColor()}/>
        </div>
    </>
}