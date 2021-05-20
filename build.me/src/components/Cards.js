import { useState } from "react"
import unParts from "./unParts"
import Parts from "./Parts"

const Cards = ({id, handleDelete, partsData, addNewParts}) => {
    /**
    id : int
    handleDelete: func
    */
    
    // const addNewParts = (name, id) => {
    //     // changes the partCards data based on name and id
    //     const newPartsArray = partCards.map((parts) => ( 
    //     (parts.name === name && parts.id === id) ? (parts.body = Parts) : parts
    //     ))
    //     console.log(newPartsArray)
    // }
    
    return (
        <div className="w-11/12 p-2 bg-indigo-200 border-2 border-gray-400 shadow-lg pb-14 h-5/6 rounded-xl">
            <div className="flex justify-around">
                <h1>Nameless Man With no Name is Long</h1>
                <div></div>
                <button className="px-3 py-1 text-black duration-300 transform bg-red-500 rounded-full shadow-md hover:text-white font-poppins hover:bg-pink-400 hover:scale-110 motion-reduce:transform-none"
                onClick={() => handleDelete(id)}>
                    Remove
                </button>
            </div>  {/** here is where the parts fit into the card */}
                    <div className="grid h-full grid-rows-5 gap-2 p-2">
                        {partsData.map((part) => (
                        <part.body name={part.name} id={id} key={part.name} addNewParts={addNewParts}/>
                        ))}

                    </div>
                <h1 className="font-poppins">
                    Total Price:
                </h1>
        </div>
    )
}

export default Cards
