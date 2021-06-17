import BuildUnpart from "./BuildUnpart";
import BuildPart from './BuildPart';
import LoadingSVG from '../../images/svg/LoadingSVG';
import { ContextData } from '../../pages/Builds';
import { useContext, useState, useEffect, useCallback } from 'react';
import { store } from 'react-notifications-component';
import axiosInstance from "../../AxiosInstance";


const BuildCard = () => {

    /**
    id : int
    handleDelete: func
    partsData: list -> obj -> with parts data => given to Parts
    changeNewParts: func -> replaces unpart with part => given to unParts
    */

    const {handleDelete,card, setSubmitting, submitting, cards} = useContext(ContextData)
    const [buildName, setBuildName] = useState('')
    const [totalPrice, setTotalPrice] = useState('0.00')
    const [isLoading, setIsLoading] = useState(false)
    
    const CheckNameDuplicate = (name) => {
        for (let item of cards) {
            if(item.CardName.length > 0 && item.CardName === name && cards.length > 2) {
                throw new Error("Duplicate Name Found!") ;
            }
        }
    }



    const TotalPriceCalculator = useCallback(() => {
        let Total = 0
        for (let item of card.partsData) {
            
            if (item.itemPrice) {
                const numberPrice = parseFloat(item.itemPrice.replace('S$', ''))
                Total += numberPrice
            }
        }
        
        setTotalPrice(Total.toFixed(2));
    },[card.partsData])

    const SubmitBuildName = async (event) => {
        event.preventDefault();

        try {

            setIsLoading(true)
            CheckNameDuplicate(buildName)
            await axiosInstance.patch(`/Builder/CardName/${card._id}`, {CardName:buildName})

            store.addNotification({
                title: "Success",
                message:"Build Name Changed!",
                type: "success",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                duration: 5000,
                }
            });

            setSubmitting(true)
            setIsLoading(false)

        } catch(err) {

            setIsLoading(false)
            if (err.message === "Duplicate Name Found!") {
                store.addNotification({
                    title: "Duplcate Build Name",
                    message:"Each build must have a unique name",
                    type: "danger",
                    insert: "bottom",
                    container: "bottom-right",
                    animationIn: ["animate__animated animate__fadeIn"],
                    animationOut: ["animate__animated animate__fadeOut"],
                    dismiss: {
                    duration: 5000,
                    }
                });

            } else {
                store.addNotification({
                    title: "Changing Build Name Error",
                    message:"Failed to Change Build Name",
                    type: "danger",
                    insert: "bottom",
                    container: "bottom-right",
                    animationIn: ["animate__animated animate__fadeIn"],
                    animationOut: ["animate__animated animate__fadeOut"],
                    dismiss: {
                    duration: 5000,
                    }
                });
            }
        }
    }

    useEffect(() => {
        setBuildName(card.CardName)
        
    },[card.CardName, setBuildName])

    useEffect(() => {
        TotalPriceCalculator()
        
    },[submitting, TotalPriceCalculator])
    return (
            <div className="relative flex flex-shrink-0 w-6/12 h-full p-5 pb-20 bg-white border-2 shadow-lg rounded-xl">
                <form className="absolute top-0 left-0 flex flex-row w-11/12 mt-2 bg-white shadow-md ml-7 rounded-xl"
                onSubmit={SubmitBuildName}
                >
                    <input className="w-9/12 px-3 py-2 text-md"
                    name="Build Name"
                    placeholder="Enter Build Name"
                    type="text"
                    onChange={(event) => setBuildName(event.target.value)}
                    value={buildName}
                    />
                    {
                    submitting || isLoading ?
                    <div className="">
                        <LoadingSVG/>
                    </div>
                    :
                    <div>
                        <div className="w-12 h-10 bg-transparent"></div>
                    </div>
                    }
                    <button className="px-5 py-1 mb-2 ml-2 text-white duration-300 bg-teal-500 rounded-full shadow-md font-roboto hover:bg-teal-700"
                    type="submit">
                        Submit
                    </button>
                </form>
                <div className="grid w-full h-full grid-flow-row grid-cols-3 grid-rows-2 mt-10 ml-2">
                    {/** Map the parts and unparts here */}
                    {card.partsData.map((part) => (
                        part.isUnPart ?
                        <BuildUnpart name={part.name} id={card._id} key={part.name + card._id} card={card}/>
                        :
                        <BuildPart name={part.name} id={card._id} key={part.name + card._id} card={card}/>
                    ))}
                </div>
                <h1 className="absolute bottom-0 left-0 py-1 pl-4 mb-2 bg-white rounded-lg shadow-md w-52 ml-7 text-md font-roboto">
                {`Total Price: ${totalPrice}`}
                </h1>
                <button className="absolute px-4 py-1 text-white duration-300 bg-indigo-500 rounded-lg shadow-md bottom-2 right-6 hover:bg-indigo-700"
                onClick={() => handleDelete(card._id)}>
                    Remove Build
                </button>
            </div>
    )
}

export default BuildCard
