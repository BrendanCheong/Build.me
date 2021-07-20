const UnCard = ({ height }) => {

    const divStyle = {
        display: "grid",
        height: height,
        placeItems: "center",
    }
    return (
        <div className="antialiased text-gray-900" style={divStyle}>
            <div  className="w-full rounded-lg shadow-md" style={{width: "350px", height: "350px"}}>
            <div/>    
                <div className="relative px-4 -mt-16 ">
                    <div className="items-center flex-shrink-0 h-56 p-6 text-center rounded-lg shadow-lg bg-gra-to-br from-purple-200 to-blue-200">
                        <div className="space-y-1">
                            <h4 className="w-56 h-16 mt-1 ml-5 text-lg font-semibold leading-tight text-center font-poppins">MSI B450 TOMAHAWK MAX ATX AM4 Motherboard</h4>
                                <div className="mt-1">
                                    Vendor:
                                    <span className="ml-1 text-base text-indigo-600 font-roboto">
                                        Amazon
                                    </span>
                                </div>
                            <div className="mt-1">
                                <span className="px-4 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 text-md font-roboto">S$ 3,399.99 </span>
                            </div>
                        </div>
                            
                        <div className="relative flex flex-row justify-between mt-1 -bottom-7">
                            <button className="px-3 py-1 font-semibold text-teal-600 uppercase duration-300 rounded-full hover:shadow-md text-md hover:bg-indigo-500 hover:text-white focus:outline-none">Change</button>
                            <button className="px-3 py-1 font-semibold text-teal-600 uppercase duration-300 rounded-full hover:shadow-md text-md hover:bg-red-500 hover:text-white focus:outline-none">Remove</button>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnCard
