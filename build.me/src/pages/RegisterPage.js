import { useState,} from 'react';
import { Link,} from 'react-router-dom';
import PCPartsCartoon from '../images/CartoonPCparts.jpg';
import { store } from 'react-notifications-component';
import axiosInstance from '../AxiosInstance';
import LoginInput from '../components/MaterialUI/LoginInput';
import CircularProgress from '@material-ui/core/CircularProgress';

const RegisterPage = () => {

	const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
	const [Message, setMessage] = useState("")
    const [ErrorState, setErrorState] = useState(false)
	const [disableButton, setDisabledButton] = useState(false)


    const register = async (event) => {
        event.preventDefault(); // prevents the default instant refresh when sending request

        try {
            const registerData = {
                username,
                email,
                password,
                passwordVerify,
            }
			setDisabledButton(true)

            const response = await axiosInstance.post('/users/add',registerData) // user is created
            

			store.addNotification({
				title: "Verification Email Sent",
				message:"Please check your email",
				type: "success",
				insert: "bottom",
				container: "bottom-right",
				animationIn: ["animate__animated animate__fadeIn"],
				animationOut: ["animate__animated animate__fadeOut"],
				dismiss: {
				duration: 5000,
				}
			});

			setDisabledButton(false)
			setMessage("") // set Error message to false
            setErrorState(false) // reset Errors if there is
            
			
            return response.data
        } catch(err) {
            const response = err.response.data.Error
			setDisabledButton(false)
			setErrorState(true)
			setMessage(response)
        }
    }


    return (
		<div className="h-screen py-1 bg-gray-100 font-poppins">
			<div className="flex justify-center flex-shrink-0 px-6 pb-8 my-12 bg-gray-100">
				{/* <!-- Row --> */}
				<div className="flex flex-shrink-0 w-full xl:w-3/4 lg:w-11/12">
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
								<p className="pb-5 text-xs italic text-red-500"
								id="ErrorMessage">
									{Message}
								</p>
							</div>
							<div className="flex flex-shrink-0 mt-1 mb-6 text-center">
								<button
									className="w-2/3 px-4 py-3 ml-20 font-bold text-white duration-200 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
									type="submit" disabled={disableButton}
								>
									Register Account
								</button>
								<div className="ml-4">
									{disableButton && 
									<CircularProgress/>}
								</div>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<Link
									className="inline-block text-sm text-blue-500 align-baseline duration-200 hover:text-indigo-800"
									to="/ForgotPassword"
								>
									Forgot Password?
								</Link>
							</div>
							<div className="flex flex-col items-center flex-shrink-0 text-center">
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


export default RegisterPage
