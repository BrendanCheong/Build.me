import Rating from "@material-ui/lab/Rating";

const ModalCard = () => {
    return (
        <div>
            
                <div className="container h-full mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="p-4 w-80">
                            <div className="block overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl">
                                <div className="relative pb-48 overflow-hidden">
                                    <img className="absolute inset-0 object-cover w-full h-full" src="https://m.media-amazon.com/images/I/71WPGXQLcLL._AC_UL480_FMwebp_QL65_.jpg" alt="Product Imgee"></img>
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-row justify-between">
                                        <button className="inline-block px-2 py-1 text-sm font-semibold leading-none tracking-wide text-teal-800 uppercase duration-300 bg-teal-200 rounded-full shadow-md font-poppins focus:outline-none hover:bg-indigo-200 hover:text-indigo-800">Store Page</button>
                                        <button className="inline-block px-2 py-1 text-sm font-semibold leading-none tracking-wide text-teal-800 uppercase duration-300 bg-teal-200 rounded-full shadow-md font-poppins focus:outline-none hover:bg-indigo-200 hover:text-indigo-800">Add to Build</button>
                                    </div>
                                    <h2 className="w-full h-24 mt-2 mb-2 font-sans font-semibold">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio</h2>
                                    <div className="flex items-center mt-3">
                                        <span className="text-sm font-semibold">S$</span>&nbsp;<span className="text-xl font-bold font-roboto">3,399</span>&nbsp;
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <span className="text-sm font-semibold">Vendor:</span>&nbsp;<span className="text-lg font-medium font-roboto">Amazon</span>&nbsp;
                                    </div>
                                </div>
                                <div className="flex flex-row p-4 text-base text-gray-700 border-t border-b font-roboto">
                                    <Rating name="product rating" 
                                    defaultValue={4.5} 
                                    precision={0.5}
                                    max={5}
                                    readOnly
                                    />
                                    <h4 className="px-2">4.5 / 5 Stars</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            
        </div>
    )
}

export default ModalCard
