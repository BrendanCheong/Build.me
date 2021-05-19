
const Uncard = ({id, addCards}) => {
    return (
        <div className="flex flex-col items-center justify-center w-11/12 p-2 bg-gray-300 border-2 border-black border-dashed shadow-lg pb-14 h-5/6 rounded-xl">
            <button className="px-8 py-4 text-xl duration-300 transform bg-blue-400 rounded-full font-poppins hover:bg-indigo-50 hover:scale-110 motion-reduce:transform-none"
            onClick={() => addCards()}>
                Add Build,{id}
            </button>
        </div> 
    ) 
} 

export default Uncard
