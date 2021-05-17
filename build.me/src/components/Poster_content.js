import ImageOne from "../images/Poster.png";

const Poster_content = () => {
    return (
        <div className="flex flex-col justify-center bg-gray-100 font-poppins px-96 pb-20">
            <img src={ImageOne} className="rounded h-full mb-20 shadow-xl"/>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl mb-2">
                    Check out our poster for more infomation
                </h2>
            </div>
        </div>
    )
}

export default Poster_content
