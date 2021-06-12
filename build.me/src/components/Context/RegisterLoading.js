import React from 'react'

const RegisterLoading = () => {
    return (
        <div className="relative items-center justify-center w-1/3 text-center bg-indigo-500 rounded-lg shadow-xl h-5/6">
            <div className="mt-9">
            <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: "auto" }} width="170" height="170" display="block" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#fff" strokeDasharray="164.93361431346415 56.97787143782138" strokeWidth="10"><animateTransform attributeName="transform" dur="1s" keyTimes="0;1" repeatCount="indefinite" type="rotate" values="0 50 50;360 50 50"></animateTransform></circle></svg></div>
            <h1 className="absolute inset-0 text-3xl font-semibold top-52 text-blueGray-100">Loading...</h1>
            <div className="absolute bottom-0 w-full bg-white rounded-b-lg h-3/6">
                <h1 className="pt-6 text-xl font-medium text-gray-700 font-roboto">Please wait while we create your account</h1>
                
            </div>
        </div>
    )
}

export default RegisterLoading
