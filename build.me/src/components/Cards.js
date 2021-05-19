const Cards = ({key}) => {
    const info = {title:"Empty", id: 1}

    return (
        <div className="w-11/12 p-2 bg-red-400 border-2 border-gray-400 shadow-lg pb-14 h-5/6 rounded-xl">
            <h1>Nameless Man</h1>
                <div className="grid h-full grid-rows-5 gap-2 p-2">
                    
                    <div className="p-2 bg-green-600 rounded-md shadow-md">
                        CPU
                    </div>
                    <div className="p-2 bg-yellow-600 rounded-md shadow-md">
                        Motherboard
                    </div>
                    <div className="p-2 bg-green-600 rounded-md shadow-md">
                        GPU
                    </div>
                    <div className="p-2 bg-yellow-600 rounded-md shadow-md">
                        Memory
                    </div>
                    <div className="p-2 bg-green-600 rounded-md shadow-md">
                        PSU
                    </div>
                    
                </div>
            <h1>Hi there</h1>
        </div>
    )
}

export default Cards
