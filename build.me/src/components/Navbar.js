import { Link } from "react-router-dom";
import ImageTwo from "../images/robot.svg"

const Navbar = ( {toggle} ) => {
    return (
        <nav className="relative flex items-center h-20 text-gray-200 bg-indigo-600 shadow-xl justify-evenly" role="navigation">
            <Link to= "/" className="flex-col lg:pr-96 md:pr-8 sm:pr-8 font-poppins">
                <img src={ImageTwo} className="pt-3 pl-5 w-14 h-14" alt="Build.me logo"/>
                <p className="pb-5 uppercase hover:text-black">Build.me</p>
            </Link>
            <div className="px-5 cursor-pointer md:hidden" 
            onClick={toggle}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
            <div className="hidden p-2 space-x-5 md:block"> {/** this burger icon will be hidden on smaller screens*/}
                <Link className="p-2 px-5 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black" to="/">
                    Home 
                </Link>
                <Link className="p-2 px-5 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black" to="/Builds">
                    Builds
                </Link>
                <Link className="p-2 px-5 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black" to="/Compare_Builds">
                    Compare Builds
                </Link>
                <Link className="p-2 px-5 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black" to="/User">
                    User
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
