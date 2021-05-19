import ImageOne from "../images/Poster.png";

const PosterContent = () => {
    return (
        <div className="flex flex-col justify-center pb-20 bg-gray-100 font-poppins px-96">
            <img src={ImageOne} className="h-full mb-20 rounded shadow-xl"alt="Build.me poster"/>
            <div className="flex flex-col items-center justify-center">
                <h2 className="mb-2 text-2xl">
                    Check out our poster for more infomation
                </h2>
            </div>
        </div>
    )
}

export default PosterContent
