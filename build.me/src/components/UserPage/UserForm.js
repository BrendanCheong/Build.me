import { useState, useContext ,createContext } from "react";
import axiosInstance from '../../AxiosInstance'; 
import { useHistory } from 'react-router-dom';
import Settings from './Settings';
import Password from './Password';
import AuthContextData from "../Context/AuthContext";

export const UserContext = createContext(null);

const UserForm = () => {

    const [toggleTabs, setToggleTabs] = useState(1) 
    const { getLoggedIn } = useContext(AuthContextData)
    const history = useHistory();

    const logOut = async () => {
        await axiosInstance.get('/users/logout'); // returns cookie that expires immediately
        await getLoggedIn();

        history.push('/Login')
    }

    const Toggler = (index) => {
        setToggleTabs(index)
    }

    return (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center md:w-full lg:w-full">
            <div
            className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
            >
            {/** LeftSide Nonsense */}
                <div
                className="flex flex-col justify-end text-lg text-white align-bottom bg-gradient-to-b from-indigo-500 to-purple-700 md:w-36 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly lg:w-36 font-roboto">
                    <button className={
                        toggleTabs === 1
                        ?
                        "py-2 pl-3 ml-8 duration-300 bg-white rounded-lg outline-none pr-14 text-trueGray-700 focus:outline-none"
                        :
                        "py-2 pl-3 ml-8 duration-300 rounded-lg outline-none pr-14 text-white focus:outline-none"}
                        onClick={() => Toggler(1)}
                    >
                    Settings
                    </button>
                    <button className={
                        toggleTabs === 2
                        ?
                        "py-2 pl-3 ml-8 duration-300 bg-white rounded-lg outline-none pr-14 text-trueGray-700 focus:outline-none"
                        :
                        "py-2 pl-3 ml-8 duration-300 rounded-lg outline-none pr-14 text-white focus:outline-none"}
                        onClick={() => Toggler(2)}
                    >Password
                    </button>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        {/** Rightside Nonsense */}
        <UserContext.Provider value={{toggleTabs, setToggleTabs, logOut}}>
            {(() => {
                switch(toggleTabs) {
                    case 1:
                        return (<Settings/>)
                    default:
                        return (<Password/>)
                }
            })()}
        </UserContext.Provider>
        </div>
    </div>
    )
}

export default UserForm
