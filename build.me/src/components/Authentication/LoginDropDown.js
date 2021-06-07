import { Link } from "react-router-dom";


const LoginDropDown = ({isOpen, toggle}) => {
    return (
        <div className={isOpen ? "grid grid-rows-4 text-center items-center bg-gray-50 shadow-md" : 'hidden'}
        onClick={toggle}
        >
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black"to="/Login">
                Login 
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black"to="/Register">
                Register 
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-yellow-500 hover:text-black"to="/Public_Builds">
                Builds 
            </Link>
        </div>
    )
}

export default LoginDropDown
