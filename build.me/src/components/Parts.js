
const Parts = ({name, id}) => {
    return (
        <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-2 bg-gray-100 rounded-md">
                <div className="row-span-3">Image</div>
                <div className="col-span-2">Ryzen 5 3600 really long</div>
                <div className="">vendor: Iprice</div>
                <div className="font-poppins">Price: 20000</div>
                <div className="static flex justify-around">
                    <div></div>
                    <div></div>
                    <button className="static px-2 py-1 text-sm text-white duration-300 transform bg-indigo-400 rounded-full hover:scale-110 motion-reduce:transform-none">
                        Change
                    </button>
                </div>
                <div className="static flex justify-around">
                    <div></div>
                    <div></div>
                    <button className="static px-2 py-1 text-sm text-white duration-300 transform bg-indigo-400 rounded-full hover:scale-110 motion-reduce:transform-none">
                        Remove
                    </button>
                </div>
        </div>
    )
}

export default Parts
