import { useState } from 'react';
import { useHistory  } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance';
import { SuccessHandlingNotif } from '../Misc/Success';
import { ErrorHandlingNotif } from '../Misc/BigError';

const Reset = (props) => {

    const history = useHistory();
    const [NewPasswordToggle, setNewPasswordToggle] = useState(false);
    const [ConfirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newPasswordState, setNewPasswordState] = useState(undefined);
    const [newConfirmPassword, setNewConfirmPassword] = useState(undefined);
    const [successState, setSuccessState] = useState(false);
    const [ErrorState, setErrorState] = useState('');

    const ToggleEye = (event, state) => {
        event.preventDefault();
        if (state === 'NewPassword') {

            setNewPasswordToggle(NewPasswordToggle ? false : true);

        } else {

            setConfirmPasswordToggle(ConfirmPasswordToggle ? false : true);

        }
    }

    const SubmitPasswords = async (event) => {
        event.preventDefault();
        const token = props.match.params.token
        setLoading(true)
        try {
            const response = await axiosInstance.post(`/users/reset/Password/${token}`, {
                password: newPasswordState,
                passwordVerify: newConfirmPassword,
            })
            SuccessHandlingNotif(response.data)
            setSuccessState(true)
            setErrorState('')
        } catch(err) {
            if (typeof err.response.data.Error === 'string') {
                setErrorState(err.response.data.Error)
            }
            else {
                ErrorHandlingNotif(err.response.data.Error.message)
            }
            
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 min-w-screen">
            <div className="container mx-auto">
                <div className="flex items-center justify-center">
                    <div className="w-full my-12 xl:w-3/4 lg:w-11/12 lg:ml-96 xl:ml-96">
                        <div className="flex flex-col items-start justify-between w-full p-5 bg-white rounded-lg shadow-md lg:w-1/2">
                            <h1 className="text-3xl font-poppins text-blueGray-700">Change Password</h1>
                            <p className="my-5 text-roboto">Make Sure your new password is at least 8 characters long to ensure security.</p>
                            <form className="flex flex-col w-full space-y-5" onSubmit={SubmitPasswords}>
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 font-roboto">New Password</label>
                                        <div className="flex flex-row space-x-3">
                                            <input
                                            type={NewPasswordToggle ? "text" : "Password"}
                                            id="text"
                                            autoFocus
                                            className="w-11/12 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-200"
                                            onChange={(event) => setNewPasswordState(event.target.value)}
                                            />
                                            <button className="inset-y-0 flex items-center px-3 pr-3 text-sm leading-5 focus:outline-none"
                                            onClick={(event) => ToggleEye(event, "NewPassword")}
                                            >
                                            {(() => {
                                                if (!NewPasswordToggle) return (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                    ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                )
                                                else return (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                                )
                                            })()}
                                            </button>
                                        </div>
                                        {(() => {
                                            if (ErrorState === 'Password needs to be at least 8 characters') return (<em className="text-sm text-red-500 font-roboto">{ErrorState}</em>)

                                            else return (<p className="text-sm text-transparent font-roboto">.</p>)
                                        })()}
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 font-roboto">Confirm Password</label>
                                        <div className="flex flex-row space-x-3">
                                            <input
                                            type={ConfirmPasswordToggle ? "text" : "Password"}
                                            id="text"
                                            autofocus
                                            className="w-11/12 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-200"
                                            onChange={(event) => setNewConfirmPassword(event.target.value)}
                                            />
                                            <button class="inset-y-0 flex items-center px-3 pr-3 text-sm leading-5 focus:outline-none"
                                            onClick={(event) => ToggleEye(event, "ConfirmPassword")}
                                            >
                                            {(() => {
                                                if (!ConfirmPasswordToggle) return (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                    ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                )
                                                else return (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                                )
                                            })()}
                                            </button>
                                        </div>
                                        {(() => {
                                            if (ErrorState === 'Please enter the same password twice') return (<em className="text-sm text-red-500 font-roboto">{ErrorState}</em>)

                                            else return (<p className="text-sm text-transparent font-roboto">.</p>)
                                        })()}
                                </div>
                                {(() => {   
                                    if (successState) {
                                        return (
                                            <button className="inline-flex flex-row items-center justify-center px-12 py-2 text-base font-medium text-center text-white duration-300 delay-300 border border-transparent rounded-md shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-700 hover:to-indigo-700 focus:outline-none font-poppins" onClick={() => history.push("/Login")}>
                                                <p>Login Now</p> 
                                            </button>
                                        )
                                    } else if (loading) {
                                        return (
                                            <button className="inline-flex flex-row items-center justify-center px-12 py-2 text-base font-medium text-center text-white duration-300 delay-300 border border-transparent rounded-md shadow-md bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-700 hover:to-teal-700 focus:outline-none font-poppins" type='submit'>
                                                <svg className="w-5 h-6 mr-1 transition duration-300 delay-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> 
                                            </button>
                                        )
                                    } else {
                                        return (<button className="inline-flex flex-row items-center justify-center px-12 py-2 text-base font-medium text-center text-white duration-300 delay-300 border border-transparent rounded-md shadow-md bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-700 hover:to-teal-700 focus:outline-none font-poppins" type='submit'>
                                            <p>Submit</p> 
                                        </button>)
                                    }
                                })()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Reset
