import { Link } from 'react-router-dom';
import { useState } from 'react';
import  TextField  from '@material-ui/core/TextField';
import PCPartsCartoon from "../../images/CartoonPCparts.jpg";
import axiosInstance from '../../AxiosInstance';

const SendUsername = () => {

    const [UsernameField, setUsernameField] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [Email, setEmail] = useState(false);
    const [Loading, setLoading] = useState(false);

    const SubmitReset = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const response = await axiosInstance.post('/users/forgot/Password', {
                username: UsernameField
            })
            setEmail(response.data);
            setLoading(false)
        } catch(err) {
            setLoading(false)
            console.error(err.response.data.Error)
            setErrorMessage(err.response.data.Error)
        }
    }

    return (
        <div>
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				<div className="flex w-full xl:w-3/4 lg:w-11/12">
                {/** The White BLock */}
                    {(() => {
                        if (!Email) return (<>
                                <div className="w-full p-5 bg-white rounded-lg shadow-md lg:w-1/2 lg:rounded-r-none">
                                    <div className="px-8 mb-4 text-center">
                                        <h3 className="pt-4 mb-4 text-2xl font-poppins">Forgot Your Password?</h3>
                                        <p className="mb-5 text-sm text-gray-700 font-roboto">
                                            We get it, stuff happens. Just enter your Username below and we'll send your Email a
                                            link to reset your password!
                                        </p>
                                    </div>
                                    <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={SubmitReset}>
                                        <TextField
                                            className="h-24 w-80 "
                                            variant="filled"
                                            color="primary"
                                            size="small"
                                            label="Username"
                                            id="Username"
                                            error={ errorMessage ? true : false}
                                            helperText={ errorMessage }
                                            onChange={(event) => setUsernameField(event.target.value)}
                                        />
                                        <div className="flex flex-col items-center justify-center mb-6 text-center">
                                            <button
                                                className="flex flex-row pt-2 pb-2 pl-6 pr-12 text-sm font-bold text-white duration-300 bg-red-500 rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
                                                type="submit"
                                            >
                                            {(() => {
                                                if (Loading) return (<>
                                                    <svg className="w-5 h-5 mr-3 -ml-1 transition duration-300 delay-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                                </>)
                                                else return (<>
                                                    <div className="w-5 h-5 mr-3 -ml-1"></div>
                                                </>)
                                            })()}
                                                Email me a recovery link
                                            </button>
                                        </div>
                                        <hr className="mb-6 border-t" />
                                        <div className="text-center">
                                            <Link
                                                className="inline-block text-sm text-indigo-500 align-baseline hover:text-indigo-800 font-poppins"
                                                to="/Register"
                                            >
                                                Create an Account!
                                            </Link>
                                        </div>
                                        <div className="text-center">
                                            <Link
                                                className="inline-block text-sm text-indigo-500 align-baseline hover:text-indigo-800 font-poppins"
                                                to="/Login"
                                            >
                                                Already have an account? Login!
                                            </Link>
                                        </div>
                                    </form>
                        </div>
                        </>)

                        else return (<>
                            <div className="w-full p-5 bg-white rounded-lg shadow-md lg:w-1/2 lg:rounded-r-none">
                                <div className="px-8 mb-4 text-center">
                                    <h3 className="pt-4 mb-4 text-2xl font-poppins">Email Sent!</h3>
                                    <p className="mb-5 text-sm text-gray-700 font-roboto">
                                        {`Check your inbox at ${Email} and click on the Reset Password Link! The link sent will expire in 8 minutes. If the email is not in your inbox, check your spam folder.`}
                                    </p>
                                </div>
                            </div>
                        </>)
                    })()}
                    
                    {/** End of White Block */}
					<img
						className="hidden w-full h-auto bg-cover rounded-r-lg shadow-md bg-gradient-to-b from-indigo-400 to-purple-400 lg:block lg:w-1/2"
                        alt="PC parts Cartoon"
						src={PCPartsCartoon}
					>

                    </img>
					
				</div>
			</div>
		</div>
        </div>
    )
}

export default SendUsername
