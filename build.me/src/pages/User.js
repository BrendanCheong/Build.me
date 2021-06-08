// import {useSpring, animated} from 'react-spring';
import LogoutButton from '../components/Authentication/LogoutButton';

const User = () => {

    // const animation = useSpring({
    //     config: {
    //         duration: 250,
    //     },
    //     opacity: isOpenModal ? 1 : 0,
    //     transform: isOpenModal ? `translateY(0%)` : `translateY(-100%)`,
    // })

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl text-black uppercase font-poppins">
                Coming Soon
            </h1>
            <LogoutButton/>
        </div>
    )
}

export default User
