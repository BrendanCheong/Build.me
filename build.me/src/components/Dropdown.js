import { Link } from "react-router-dom";


const Dropdown = ( {isOpen, toggle} ) => {
    return (
        <div className={isOpen ? "grid grid-rows-4 text-center items-center bg-gray-50 shadow-md" : 'hidden'}
        onClick={toggle}
        >
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-teal-500 text-blueGray-200"to="/">
                Home 
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-teal-500 text-blueGray-200"to="/Builds">
                Builds
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-teal-500 text-blueGray-200"to="/Compare_Builds">
                Compare Builds
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-teal-500 text-blueGray-200"to="/User">
                User
            </Link>
        </div>
    )
}

export default Dropdown
