import AuthContextData from './AuthContext';
import { useContext } from 'react';
import {useHistory } from 'react-router-dom';

const RegisterSuccess = ({setLoading}) => {

    const { getLoggedIn } = useContext(AuthContextData)
    const history = useHistory()

    const LoginAndPush = async () => {
        await getLoggedIn().catch(error => setLoading(error.response.data.Error))
        history.push('/') // push user to Home page
    }

    return (
        <div className="relative items-center justify-center w-1/3 text-center rounded-lg shadow-xl bg-lime-500 h-5/6">
            <svg className="absolute inset-0 top-0 right-0 w-32 h-32 mt-16 ml-44" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <h1 className="absolute inset-0 text-3xl font-semibold top-52 text-blueGray-100">Success</h1>
            <div className="absolute bottom-0 w-full bg-white rounded-b-lg h-3/6">
                <h1 className="pt-6 text-xl font-medium text-gray-700 font-roboto">Congratulations, Your Account has been Successfully Created!</h1>
                <button className="px-6 py-2 mt-20 text-lg text-white duration-300 rounded-full shadow-md bg-lime-500 hover:bg-lime-600 font-roboto" onClick={() => LoginAndPush()}>Continue to Site</button>
            </div>
        </div>
    )
}

export default RegisterSuccess
