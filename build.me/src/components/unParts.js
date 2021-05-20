
const unParts = ({name, id, addNewParts}) => {
    /*
    name: string
    id: int
    addNewParts: func -> taken from Cards => changes unParts to Parts
    */
    return (
        <div className="flex flex-col justify-between p-2 border-2 border-gray-400 border-dashed rounded-md shadow-inner">
            {name}
            <div className="flex justify-end">
                <button onClick={() => addNewParts(name, id)} className="font-poppins">
                    Add
                </button>
            </div>
        </div>
    )
}

export default unParts
