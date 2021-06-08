import { useState, useContext } from 'react';
import axiosInstance from "../../AxiosInstance";
import { useHistory } from "react-router-dom";
import AuthContextData from '../Context/AuthContext';

const Login = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { getLoggedIn } = useContext(AuthContextData)
    const history = useHistory();

    const Login = async (event) => {
        event.preventDefault(); // prevents the default loading when sending query strings

        try {
            const LoginData = {
                username,
                email,
                password,
            }

            const response = await axiosInstance.post('/users/login',LoginData)
            console.log(response.data)
            
            await getLoggedIn();
            history.push('/')
            return response.data
        } catch(err) {
            return err
        }
    }
    return (
        <div className="flex flex-col items-center justify-center align-middle">
            <h1>Login to your account</h1>
            <form className="flex flex-col items-center justify-center space-y-2" onSubmit={Login}>
                <input type="username" placeholder="Username" onChange={(event) =>setUsername(event.target.value)}
                    value={username}
                />
                <input type="email" placeholder="Email" onChange={(event) =>setEmail(event.target.value)}
                    value={email}
                />
                <input type="password" placeholder="Password" onChange={(event) =>setPassword(event.target.value)}
                    value={password}
                />
                <button className="px-4 py-1 text-white bg-red-500 bg-opacity-50 rounded-lg" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
