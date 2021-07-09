import { useState } from 'react';
import axiosInstance from '../../AxiosInstance';
import { SuccessHandlingNotif } from '../Misc/Success';

const Password = () => {


    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [newPassword, setNewPassword] = useState(undefined);
    const [newConfirm, setNewConfirm] = useState(undefined);
    const [passwordError, setPasswordError] = useState('');

    const SubmitPasswords = async (event) => {
        event.preventDefault();
        setLoadingSubmit(true);
        try {

            const response = await axiosInstance.patch('/users/reset/Password', {
                password: newPassword,
                passwordVerify: newConfirm,
            })
            SuccessHandlingNotif(response.data);
            setPasswordError('');
            setLoadingSubmit(false)
        } catch(err) {

            setPasswordError(err.response.data.Error)
            setLoadingSubmit(false);

        }
    }


    return (
        <div className="p-5 bg-white md:flex-1 md:w-full lg:w-full md:ml-10 lg:ml-10 xl:ml-10">
            <h3 className="my-4 text-2xl font-semibold text-gray-700 font-poppins">Reset Password</h3>
            <form className="flex flex-col space-y-5" onSubmit={SubmitPasswords}>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 font-roboto">New Password</label>
                        <input
                        type="text"
                        id="text"
                        autofocus
                        className="w-10/12 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-200"
                        value={newPassword}
                        onChange={(event) =>setNewPassword(event.target.value)}
                        />
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-500 font-roboto">Confirm Password</label>
                    </div>
                    <input
                    type="Password"
                    id="Password"
                    className="w-10/12 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-200"
                    value={newConfirm}
                    onChange={(event) =>setNewConfirm(event.target.value)}
                    />
                    {(() => {
                                if (passwordError) return (<em className="text-sm text-red-500 text-roboto">{passwordError}</em>)
                                else return (<p className="pb-4"></p>)
                    })()}
                </div>
            <div className="flex items-center space-x-2">
            
            </div>
            <div className="flex flex-col items-center justify-center">
                {(() => {
                    switch(loadingSubmit) {
                        case true:
                            return (<>
                                    <button className="inline-flex items-center px-8 py-2 text-base font-medium text-white duration-300 delay-300 bg-teal-400 border border-transparent rounded-md shadow-sm bg-gradient-to-r focus:outline-none font-poppins">
                                    <svg className="w-5 h-5 mr-3 -ml-1 transition duration-300 delay-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        Loading...
                                    </button>
                            </>)
                        default:
                            return (
                                <>
                                    <button className="inline-flex items-center px-12 py-2 text-base font-medium text-white duration-300 delay-300 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-700 hover:to-teal-700 focus:outline-none font-poppins" type='submit'>
                                        Submit
                                    </button>
                                </>
                            )
                    }
                })()}
            </div>
            </form>
        </div>
    )
}

export default Password
