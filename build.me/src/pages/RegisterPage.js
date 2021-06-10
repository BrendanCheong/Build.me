import { useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import PCPartsCartoon from '../images/CartoonPCparts.jpg';
import axiosInstance from '../AxiosInstance';
import AuthContextData from '../components/Context/AuthContext';
import LoginInput from '../components/MaterialUI/LoginInput';

const RegisterPage = () => {

	const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
	const [Message, setMessage] = useState("")
    const [ErrorState, setErrorState] = useState(false)

    const { getLoggedIn } = useContext(AuthContextData)
    const history = useHistory()

    const register = async (event) => {
        event.preventDefault(); // prevents the deafault loading when sending query strings

        try {
            const registerData = {
                username,
                email,
                password,
                passwordVerify,
            }

            const response = await axiosInstance.post('/users/add',registerData)
            await getLoggedIn();
			await axiosInstance.post('/Builder/',{
				"darkmode":false,
				"CardArray":[]
			})

			setMessage("")
            setErrorState(false)
            history.push('/')
			
            return response.data
        } catch(err) {
            const response = err.response.data.Error
			setErrorState(true)
			setMessage(response)
        }
    }


    return (
		<div className="h-screen py-1 bg-gray-100 font-poppins">
			<div className="flex justify-center px-6 pb-8 my-12 bg-gray-100">
				{/* <!-- Row --> */}
				<div className="flex w-full xl:w-3/4 lg:w-11/12">
					{/* <!-- Col --> */}
					<img className="hidden object-cover w-full h-auto bg-gray-400 bg-cover rounded-l-lg shadow-2xl lg:block lg:w-5/12" alt="PCparts pic" src={PCPartsCartoon}/>
					{/* <!-- Col --> */}
					<div className="w-full p-5 bg-white rounded-lg shadow-xl lg:w-7/12 lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" noValidate autoComplete='off' onSubmit={register}>
							<div className="mb-4">
								<LoginInput label={"Username"}setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} setPasswordVerify={setPasswordVerify} width={true} ErrorState={ErrorState}/>
							</div>
							<div className="mb-4">
								<LoginInput label={"Email"}setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} setPasswordVerify={setPasswordVerify} width={true} ErrorState={ErrorState}/>
							</div>
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<LoginInput label={"Password"}setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} setPasswordVerify={setPasswordVerify} width={false} ErrorState={ErrorState}/>
								</div>
								<div className="md:ml-2">
									<LoginInput label={"Confirm Password"}setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} setPasswordVerify={setPasswordVerify} width={false} ErrorState={ErrorState}/>
								</div>
							</div>
							<div className="items-center justify-center text-center">
								<p className="pb-5 text-xs italic text-red-500">{Message}</p>
							</div>
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white duration-200 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Register Account
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<p
									className="inline-block text-sm text-blue-500 align-baseline duration-200 hover:text-indigo-800"
									href="#"
								>
									Forgot Password?
								</p>
							</div>
							<div className="text-center">
								<Link
									className="inline-block text-sm text-blue-500 align-baseline duration-200 hover:text-indigo-800"
									to="/Login"
								>
									Already have an account? Login!
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
    )
}

// <div className="h-screen bg-gray-100 place-items-center">
    //     <Register/>
// </div>

export default RegisterPage
