import { useContext } from 'react';
import axiosInstance from '../../AxiosInstance'; 
import { useHistory } from 'react-router-dom';
import AuthContextData from '../Context/AuthContext';

const LogoutButton = () => {

    const { getLoggedIn } = useContext(AuthContextData)
    const history = useHistory();

    const logOut = async () => {
        await axiosInstance.get('/users/logout'); // returns cookie that expires immediately
        await getLoggedIn();

        history.push('/Login')
    }
    return (
        <>
            <button className="px-4 py-1 bg-yellow-500 rounded-2xl" onClick={logOut}>
                Log out
            </button>
        </>
    )
}

export default LogoutButton
