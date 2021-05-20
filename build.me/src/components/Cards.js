import { useState } from "react"
import Parts from "./Parts"

const Cards = ({id, handleDelete}) => {
    /**
    id : int
    handleDelete: func
    */
    const [partCards, setPartCards] = useState([
    {name: 'CPU', body: Parts, partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing"},
    {name: 'Motherboard', body: Parts, partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing"},
    {name: 'GPU', body: Parts, partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing"},
    {name: 'Memory', body: Parts, partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing"},
    {name: 'PSU', body: Parts, partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing"},
    ])
    
    
    return (
        <div className="w-11/12 p-2 bg-indigo-200 border-2 border-gray-400 shadow-lg pb-14 h-5/6 rounded-xl">
            <div className="flex justify-around">
                <h1>Nameless Man With no Name is Long</h1>
                <div></div>
                <button className="px-3 py-1 text-black duration-300 transform bg-red-500 rounded-full shadow-md hover:text-white font-poppins hover:bg-pink-400 hover:scale-110 motion-reduce:transform-none"
                onClick={() => handleDelete(id)}>
                    Remove
                </button>
            </div>
                    <div className="grid h-full grid-rows-5 gap-2 p-2">
                        {partCards.map((part) => (
                        <part.body name={part.name}/>
                        ))}
                    </div>
                <h1 className="font-poppins">
                    Total Price:
                </h1>
        </div>
    )
}

export default Cards
