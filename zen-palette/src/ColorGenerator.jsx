function Card({color}){
    return <>
        <div className="card w-[20vw] h-[85vh] bg-[#fff] rounded-3xl" style={{background: color}}></div>
    </>
}

export default function ColorGenerator(){
    return <>
        <div className="paletteGenerator w-[95vw] h-full bg-[#FFDCDC] rounded-3xl m-auto pl-10 pt-7 pb-7 pr-10 flex gap-10">
            <Card color = "#000"/>
        </div>
    </>
}