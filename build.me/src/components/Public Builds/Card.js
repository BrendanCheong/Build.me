import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

const Card = ({ height, type }) => {

    const divStyle = {
        display: "grid",
        height: height,
        placeItems: "center",
    }
    return (
        <div className="antialiased text-white" style={divStyle}>
            <div>
            <img src="https://m.media-amazon.com/images/I/91td3mS0aRL._AC_UL320_.jpg" alt="Product imgee" className="object-cover object-center w-full rounded-lg shadow-md" style={{width: "350px", height: "350px"}}/>    
                <div className="relative px-4 -mt-16 ">
                    <div className="items-center flex-shrink-0 h-56 p-6 text-center rounded-lg shadow-lg bg-gradient-to-br from-purple-600 to-indigo-600">
                        <div className="space-y-1">
                            <h4 className="w-56 h-16 mt-1 ml-5 text-lg font-semibold leading-tight text-center font-poppins">MSI B450 TOMAHAWK MAX ATX AM4 Motherboard</h4>
                                <div className="mt-1">
                                    Vendor:
                                    <span className="ml-1 text-base text-teal-200 font-roboto">
                                        Amazon
                                    </span>
                                </div>
                            <div className="mt-1">
                                <span className="px-4 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-teal-500 text-md font-roboto">S$ 3,399.99 </span>
                            </div>
                        </div>
                            
                        <div className="relative flex flex-row justify-between mt-1 -bottom-7">
                            <button className="px-3 py-1 font-semibold text-indigo-100 uppercase duration-300 rounded-full hover:shadow-md text-md hover:bg-teal-500 hover:text-white focus:outline-none">Change</button>
                            <button className="px-3 py-1 font-semibold text-indigo-100 uppercase duration-300 rounded-full hover:shadow-md text-md hover:bg-red-500 hover:text-white focus:outline-none">Remove</button>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card