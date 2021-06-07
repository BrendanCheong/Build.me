import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from "../../AxiosInstance";
import AuthContextData from '../Context/AuthContext';

const Register = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const { getLoggedIn } = useContext(AuthContextData)
    const history = useHistory()

    const register = async (event) => {
        event.preventDefault(); // prevents the deafault loading when sending query strings

        try {
            const registerData = {
                username,
                email,
                password,
                passwordVerify,
            }

            const response = await axiosInstance.post('/users/add',registerData)
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
            <h1>Register a New Account</h1>
            <form className="flex flex-col items-center justify-center space-y-2" onSubmit={register}>
                <input type="username" placeholder="Username" onChange={(event) =>setUsername(event.target.value)}
                    value={username}
                />
                <input type="email" placeholder="Email" onChange={(event) =>setEmail(event.target.value)}
                    value={email}
                />
                <input type="password" placeholder="Password" onChange={(event) =>setPassword(event.target.value)}
                    value={password}
                />
                <input type="password" placeholder="Verify Passsword" onChange={(event) =>setPasswordVerify(event.target.value)} 
                    value={passwordVerify}

                />
                <button className="px-4 py-1 text-white bg-red-500 bg-opacity-50 rounded-lg" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
