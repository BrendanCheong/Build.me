import LogoutButton from '../components/Authentication/LogoutButton';
import UserForm from '../components/UserPage/UserForm';

const User = () => {

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
            <UserForm/>
            <LogoutButton/>
        </div>
    )
}

export default User
