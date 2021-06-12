import { useEffect, useState, useContext } from 'react';
import axiosInstance from '../../AxiosInstance';
import RegisterSuccess from '../Context/RegisterSuccess';
import RegisterLoading from '../Context/RegisterLoading';
import RegisterError from '../Context/RegisterError';
import AuthContextData from '../Context/AuthContext';

const Confirmation = (props) => {

    const MyToken = props.match.params.token;
    const [loading, setLoading] = useState(true);
    const { getLoggedIn } = useContext(AuthContextData)

    useEffect(() => {
        console.log(MyToken)
        const VerifyUser =  async () => {
            const response = await axiosInstance.get(`/users/verify/${MyToken}`).catch(error => setLoading(error.response.data.Error)) // get cookie
            if(response.data === "User Added Successfully") {
                await axiosInstance.post('/Builder/',{  // add builder
                    "darkmode":false,
                    "CardArray":[]
                }).catch(error => setLoading(error.response.data.Error))
                setLoading(false)
            }
        }
        if(loading) {
            VerifyUser();
        }
    },[loading, MyToken, getLoggedIn])

    return (
        <div className="flex items-center justify-center h-screen text-center bg-gray-100">
            {(() => {
            switch(loading) {
                case true:
                    return(<RegisterLoading/>)
                case false:
                    return(<RegisterSuccess setLoading={setLoading}/>)
                default:
                    return (<RegisterError loading={loading}/>)
            }
            })()} {/** need extra bracket to void the function */}
        </div>
    )
}

export default Confirmation
