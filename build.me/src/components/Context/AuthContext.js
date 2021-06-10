import { useState, useEffect, createContext} from 'react';
import axiosInstance from '../../AxiosInstance';

const AuthContextData = createContext(null);

const AuthContextFunc = (props) => {

    const [loggedIn, setLoggedIn] = useState({status: undefined})

    const getLoggedIn = async () => {
        const loggedInResponse = await axiosInstance.get('/users/loggedIn');
        setLoggedIn(loggedInResponse.data)
    }

    useEffect(() => {

        getLoggedIn()
        return () => {
            setLoggedIn({status:undefined}) // or status undefined, basically set a default state while async is loading
        }

    }, [])

    return (
        <AuthContextData.Provider value={{loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContextData.Provider>
    )
}

export default AuthContextData;
export { AuthContextFunc }
