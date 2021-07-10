import { useState, useContext } from 'react';
import { UserContext } from './UserForm';
import axiosInstance from '../../AxiosInstance';
import { SuccessHandlingNotif } from '../Misc/Success';

const Settings = () => {

    const { logOut, logOutLoading} = useContext(UserContext);

    const [loadingButtonEmail, setLoadingButtonEmail] = useState(false);
    const [loadingButtonUsername, setLoadingButtonUsername] = useState(false);
    const [newEmail, setNewEmail] = useState(undefined);
    const [newUsername, setNewUsername] = useState(undefined);
    const [newEmailError, setNewEmailError] = useState('');
    const [newUsernameError, setNewUsernameError] = useState(''); // remember to reset the error message

    const SubmitEmail = async (event) => {
        event.preventDefault();
        setLoadingButtonEmail(true)
        try {
            const response = await axiosInstance.patch('/users/reset/Email', {
                email: newEmail
            })
            console.log(response.data);
            SuccessHandlingNotif(response.data);
            setNewEmailError('')
            setLoadingButtonEmail(false)
        } catch(err) {
            
            setNewEmailError(err.response.data)
            setLoadingButtonEmail(false)
        }
    }

    const SubmitUsername = async (event) => {
        event.preventDefault();
        setLoadingButtonUsername(true)
        try {
            const response = await axiosInstance.patch('/users/reset/Username', {
                username: newUsername
            })
            console.log(response.data);
            SuccessHandlingNotif(response.data);
            setNewUsernameError('');
            setLoadingButtonUsername(false);

        } catch(err) {
            
            setNewUsernameError(err.response.data.Error);
            setLoadingButtonUsername(false);
        }
    }

    
    return (
        <div className="p-5 bg-white md:flex-1 md:w-full lg:w-full md:ml-10 lg:ml-10 xl:ml-10">
        <h3 className="my-4 text-2xl font-semibold text-gray-700 font-poppins">Change Account Details</h3>
            <form className="flex flex-col mb-5 space-y-5" onSubmit={SubmitEmail}>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 font-roboto">Email address</label>
                        <div className="flex flex-row space-x-10">
                            <input
                                type="email"
                                id="email"
                                autoFocus
                                className="w-8/12 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-200"
                                value={newEmail}
                                onChange={(event) =>setNewEmail(event.target.value)}
                            />
                            {(() => {
                                switch(loadingButtonEmail) {
                                    case true:
                                        return (
                                            <>
                                                <button type="Loading" className="inline-flex items-center px-4 py-2 text-base font-medium text-white duration-300 delay-300 bg-teal-400 border border-transparent rounded-md shadow-sm bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                                                <svg className="w-5 h-5 mr-3 -ml-1 transition duration-300 delay-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                                Loading...
                                                </button>
                                            </>
                                        )
                                    default:
                                        return (
                                            <>
                                                <button type="submit" className="inline-flex items-center px-4 py-2 text-base font-medium text-white duration-300 delay-300 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                Change
                                                </button>
                                            </>
                                        )
                                }
                            })()}
                        </div>
                    {(() => {
                        if (newEmailError) return (<em className="text-sm text-red-500 text-roboto">{newEmailError}</em>)
                        else return (<p className="pb-4"></p>)
                    })()}
                </div>
            </form>
            <form className="flex flex-col mb-5 space-y-5" onSubmit={SubmitUsername}> 
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-500 font-roboto">Username</label>
                    </div>
                    <div className="flex flex-row space-x-10">
                        <input
                        type="text"
                        id="Username"
                        className="w-8/12 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                        value={newUsername}
                        onChange={(event) =>setNewUsername(event.target.value)}
                        />
                        {(() => {
                                switch(loadingButtonUsername) {
                                    case true:
                                        return (
                                            <>
                                                <button type="Loading" className="inline-flex items-center px-4 py-2 text-base font-medium text-white duration-300 delay-300 bg-teal-400 border border-transparent rounded-md shadow-sm bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                                                <svg className="w-5 h-5 mr-3 -ml-1 transition duration-300 delay-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                                Loading...
                                                </button>
                                            </>
                                        )
                                    default:
                                        return (
                                            <>
                                                <button type="submit" className="inline-flex items-center px-4 py-2 text-base font-medium text-white duration-300 delay-300 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                Change
                                                </button>
                                            </>
                                        )
                                }
                            })()}
                    </div>
                    {(() => {
                        if (newUsernameError) return (<em className="text-sm text-red-500 text-roboto">{newUsernameError}</em>)
                        else return (<p className="pb-4"></p>)
                    })()}
                </div>
            </form>
            <div className="flex flex-col items-center justify-center">
                {(() => {
                    switch(logOutLoading) {
                        case true:
                            return (<>
                                <button type="Loading" className="inline-flex items-center px-4 py-2 text-base font-medium text-white duration-300 delay-300 bg-teal-400 border border-transparent rounded-md shadow-sm bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                                <svg className="w-5 h-5 mr-3 -ml-1 transition duration-300 delay-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                Loading...
                                </button>
                            </>)
                        default:
                            return (<>
                                <button className="inline-flex items-center px-10 py-2 text-base font-medium text-white duration-300 delay-300 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-700 hover:to-teal-700 focus:outline-none font-poppins" title="LogOut"
                                onClick={() => logOut()}>
                                    Log Out
                                </button>
                            </>)
                    }
                })()}
            </div>
        </div>
    )
}

export default Settings
