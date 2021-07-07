import { useState, useContext } from 'react';
import { UserContext } from './UserForm';

const Settings = () => {

    const {toggleTabs, setToggleTabs, logOut} = useContext(UserContext);
    
    return (
        <div className="p-5 bg-white md:flex-1 md:w-full lg:w-full md:ml-10 lg:ml-10 xl:ml-10">
        <h3 className="my-4 text-2xl font-semibold text-gray-700 font-poppins">Change Account Details</h3>
            <form action="#" className="flex flex-col mb-5 space-y-5">
                <div className="flex flex-col space-y-1">
                    <label for="email" className="text-sm font-semibold text-gray-500 font-roboto">Email address</label>
                        <div className="flex flex-row space-x-10">
                            <input
                                type="email"
                                id="email"
                                autofocus
                                className="w-8/12 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-200"
                            />
                            <button type="button" className="inline-flex items-center px-4 py-2 text-base font-medium text-white duration-300 delay-300 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {/* <svg className="w-5 h-5 mr-3 -ml-1 transition duration-300 delay-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                Send
                            </button>
                        </div>
                    <em className="text-sm text-red-500 text-roboto">Error Error Error</em>
                    {/* <p className="pb-4"></p> */}
                </div>
            </form>
            <form className="flex flex-col mb-5 space-y-5"> 
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <label for="password" className="text-sm font-semibold text-gray-500 font-roboto">Username</label>
                    </div>
                    <div className="flex flex-row space-x-10">
                        <input
                        type="text"
                        id="Username"
                        className="w-8/12 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                        />
                        <button type="button" className="inline-flex items-center px-4 py-2 text-base font-medium text-white duration-300 delay-300 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {/* <svg className="w-5 h-5 mr-3 -ml-1 transition duration-300 delay-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            Send
                        </button>
                    </div>
                    <em className="text-sm text-red-500 text-roboto">Error Error Error</em>
                    {/* <p className="pb-4"></p> */}
                </div>
            </form>
            <div className="flex flex-col items-center justify-center">
                <button className="inline-flex items-center px-8 py-2 text-base font-medium text-white duration-300 delay-300 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-700 hover:to-teal-700 focus:outline-none font-poppins" title="LogOut"
                onClick={() => logOut()}>
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default Settings
