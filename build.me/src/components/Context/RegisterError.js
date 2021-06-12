

const RegisterError = ({loading}) => {
    return (
        <div className="relative items-center justify-center w-1/3 text-center bg-red-500 rounded-lg shadow-xl h-5/6">
            <svg className="absolute inset-0 top-0 right-0 w-32 h-32 mt-16 ml-44" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h1 className="absolute inset-0 text-3xl font-semibold top-52 text-blueGray-100">Error</h1>
            <div className="absolute bottom-0 w-full bg-white rounded-b-lg h-3/6">
                <h1 className="pt-6 text-xl font-medium text-gray-700 font-roboto">{`Error detected: ${loading}`}</h1>
            </div>
        </div>
    )
}

export default RegisterError
