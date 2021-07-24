import BuildUnpart from "./BuildUnpart";
import BuildPart from './BuildPart';
import LoadingSVG from '../../images/svg/LoadingSVG';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { ContextData } from '../../pages/Builds';
import { useContext, useState, useEffect, useCallback } from 'react';
import { store } from 'react-notifications-component';
import axiosInstance from "../../AxiosInstance";

const useStyles = makeStyles(() => ({
    customWidth: {
        maxWidth: 250,
    },
}));

const description = `
Give your Build a name so that you can compare it with other builds
in "Compare Builds". You cannot use the same name twice.
`;
const BuildCard = () => {

    const classes = useStyles();
    /**
    id : int
    handleDelete: func
    partsData: list -> obj -> with parts data => given to Parts
    changeNewParts: func -> replaces unpart with part => given to unParts
    */

    const {handleDelete,card, setSubmitting, submitting, cards, removeBuildLoad, setRemoveBuildLoad, selectedCardID, setSelectedCardID, submittingBuildName, setSubmittingBuildName,} = useContext(ContextData)
    const [buildName, setBuildName] = useState('')
    const [totalPrice, setTotalPrice] = useState('0.00')
    
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
                const number = item.itemPrice.replace('S$', '')
                const numberPrice = parseFloat(number.replace(',',''))
                Total += numberPrice
            }
        }
        
        setTotalPrice(Total.toFixed(2));
    },[card.partsData])

    const SubmitBuildName = async (event) => {
        event.preventDefault();

        try {

            setSelectedCardID(card._id)
            setSubmittingBuildName(true)
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
            

        } catch(err) {

            setSelectedCardID("")
            setSubmittingBuildName(false)
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
    const DeleteCard = async (input) => {
        setSelectedCardID(input)
        setRemoveBuildLoad(true)
        await handleDelete(input)
        return
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
                    <input className="w-9/12 px-3 py-2 text-md focus:outline-none"
                    name="Build Name"
                    placeholder="Enter Build Name"
                    type="text"
                    onChange={(event) => setBuildName(event.target.value)}
                    value={buildName}
                    />
                    <div className="">
                        <Tooltip title={description} classes={{ tooltip: classes.customWidth }}>
                            <svg className="w-6 h-6 mt-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                        </Tooltip>
                    </div>
                    {
                        submittingBuildName && selectedCardID === card._id ?
                        <button className="relative flex flex-col items-center justify-center px-5 py-1 mb-2 ml-2 text-white duration-300 rounded-full shadow-md bg-gradient-to-br from-teal-500 to-blue-500 -bottom-1 font-roboto hover:bg-teal-700"
                        >
                            <svg className="w-5 h-5 mx-4 transition duration-300 delay-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        </button>
                        :
                        <button className="relative flex flex-col items-center justify-center px-5 py-1 mb-2 ml-2 text-white rounded-full shadow-md hover:duration-300 bg-gradient-to-br from-teal-500 to-blue-500 -bottom-1 font-roboto hover:bg-teal-700 focus:outline-none hover:from-teal-700 hover:to-blue-700"
                        type="submit" disabled={submitting}>
                            Submit
                        </button>
                    }
                </form>
                <div className="grid w-full h-full grid-flow-row grid-cols-3 grid-rows-2 mt-10 ml-2">
                    {/** Map the parts and unparts here */}
                    {card.partsData.map((part) => (
                        part.isUnPart ?
                        <BuildUnpart name={part.name} id={card._id} key={part.name + card._id + "UNPART"} card={card}/>
                        :
                        <BuildPart name={part.name} id={card._id} key={part.name + card._id + "PART"} card={card}/>
                    ))}
                </div>
                <h1 className="absolute bottom-0 left-0 py-1 pl-4 mb-2 bg-white rounded-lg shadow-md w-52 ml-7 text-md font-roboto">
                {`Total Price: ${totalPrice}`}
                </h1>
                {(() => {
                    if (removeBuildLoad && selectedCardID === card._id) return (<>
                        <button className="absolute px-5 py-1 text-white duration-300 rounded-lg shadow-md bg-gradient-to-r from-teal-500 to-blue-500 bottom-2 right-6 foucs:outline-none"
                        name="Removing Build" type="button">
                            Removing...
                        </button>
                    </>)
                    else return (<>
                        <button className="absolute px-4 py-1 text-white duration-300 bg-indigo-500 rounded-lg shadow-md bottom-2 right-6 hover:bg-indigo-700 focus:outline-none"
                        onClick={() => DeleteCard(card._id)} name="Remove Build" type="button" disabled={submitting}>
                            Remove Build
                        </button>
                    </>)
                })()}
            </div>
    )
}

export default BuildCard
