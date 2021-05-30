import Modal from "../components/Modal";
import {useState,} from "react";
import {useSpring, animated} from 'react-spring';
import axiosInstance from "../AxiosInstance";




const User = () => {

    const [isOpenModal, setIsOpenModal] = useState(false)

    const animation = useSpring({
        config: {
            duration: 250,
        },
        opacity: isOpenModal ? 1 : 0,
        transform: isOpenModal ? `translateY(0%)` : `translateY(-100%)`,
    })

    const AmazonScrapper = async (input) => {
        try {
            // process input to remove spaces
            const Input = input.replace(" ", "%20")
            const response = await axiosInstance.get(`/Ascrapper/${Input}`)
            return response.data
        } catch(err) {
            return err
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl text-black uppercase font-poppins">
                Coming Soon
            </h1>
            <p className="text-xl text-black font-poppins">
            editable user settings
            </p>

            {/** Modal Starts Here */}
                <button onClick={() => setIsOpenModal(true)}> 
                    Open Modal
                </button>
                <Modal open={isOpenModal} onClose={() =>setIsOpenModal(false)} animated={animated} animation={animation} >
                    Fancy Text
                </Modal>
            {/** Modal Ends here */}
            <button onClick={async () =>console.log( await AmazonScrapper("Ryzen 5 3600X"))}> Test Button</button>
        </div>
    )
}

export default User
