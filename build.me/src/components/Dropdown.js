import { Link } from "react-router-dom";


const Dropdown = ( {isOpen, toggle} ) => {
    return (
        <div className={isOpen ? "grid grid-rows-4 text-center items-center bg-gray-50 shadow-md" : 'hidden'}
        onClick={toggle}
        >
            <Link className="p-6 text-black transition duration-300 font-poppins bg-gradient-to-tl hover:from-purple-600 hover:to-indigo-600 hover:text-white"to="/">
                Home 
            </Link>
            <Link className="p-6 text-black transition duration-300 font-poppins bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white"to="/Builds">
                Builds
            </Link>
            <Link className="p-6 text-black transition duration-300 font-poppins bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white"to="/Compare_Builds">
                Compare Builds
            </Link>
            <Link className="p-6 text-black transition duration-300 font-poppins bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white"to="/User">
                User
            </Link>
        </div>
    )
}

export default Dropdown
