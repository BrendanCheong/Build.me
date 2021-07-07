import UserForm from '../components/UserPage/UserForm';

const User = () => {

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-gray-500">
            <UserForm/>
        </div>
    )
}

export default User
