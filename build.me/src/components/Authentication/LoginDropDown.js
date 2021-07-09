import { Link } from "react-router-dom";


const LoginDropDown = ({isOpen, toggle}) => {
    return (
        <div className={isOpen ? "grid grid-rows-4 text-center items-center bg-gray-50 shadow-md" : 'hidden'}
        onClick={toggle}
        >
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-teal-500 text-blueGray-300"to="/Login">
                Login 
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-teal-500 text-blueGray-300"to="/Register">
                Register 
            </Link>
            <Link className="p-6 transition duration-300 rounded-full font-poppins hover:bg-teal-500 text-blueGray-300"to="/Public_Builds">
                Builds 
            </Link>
        </div>
    )
}

export default LoginDropDown
