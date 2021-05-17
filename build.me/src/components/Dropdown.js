import { Link } from "react-router-dom";
import React from 'react'

const Dropdown = ( {isOpen, toggle} ) => {
    return (
        <div className={isOpen ? "grid grid-rows-4 text-center items-center bg-gray-50 shadow-md" : 'hidden'}
        onClick={toggle}
        >
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black"to="/">
                Home 
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black"to="/Builds">
                Builds
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black"to="/Compare_Builds">
                Compare Builds
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black"to="/User">
                User
            </Link>
        </div>
    )
}

export default Dropdown
