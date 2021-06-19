import Tabs from '../components/CompareBuildComp/Tabs';
import BarGraphTab from '../components/CompareBuildComp/BarGraphTab';
import AutoComplete from '../components/CompareBuildComp/AutoComplete';
import { createContext, useState, useEffect } from 'react';
import { ErrorHandlingNotif } from '../components/Misc/Error';
import axiosInstance from '../AxiosInstance';

export const CompBuildPageData = createContext(null)

const Compare_Builds = () => { 

    const [toggleBarGraph, setToggleBarGraph] = useState(1) // NOTE: put this in BarGraphTab.js if needed
    const [autoCompletedata, setAutoCompleteData] = useState([])
    const [autoCompleteState0, setAutoCompleteState0] = useState(null) 
    const [autoCompleteState1, setAutoCompleteState1] = useState(null) 
    const [loadingData, setLoadingData] = useState(true)
    
    const [BarGraphZero, setBarGraphZero] = useState([0,0,0,0,0,0])
    const [BarGraphOne, setBarGraphOne] = useState([0,0,0,0,0,0])

    useEffect(() => { // for BarGraphZero State, since there are 2 seperate sates
        const getPartsData = async () => {
            try {
                const response = await axiosInstance.get('/Builder/find')
                const selectedCardZero = response.data.CardArray.filter((card) => card.CardName === autoCompleteState0)
                // const selectedCardOne = response.data.CardArray.filter((card) => card.CardName === autoCompleteState1)
                if (selectedCardZero.length > 0) {
                    const priceArrZero = selectedCardZero[0].partsData.map((parts) => ( parts.itemPrice ? parseFloat(parts.itemPrice.replace('S$','')) : 0))
                    
                    setBarGraphZero(priceArrZero);
                    // setBarGraphOne(priceArrOne);

                    setLoadingData(false)
                }
                
            } catch(err) {
                console.log(err.message)
                if (err.message !=="Cannot read property 'map' of null") {
                    ErrorHandlingNotif()
                }
                
            }
        }

        if(loadingData) {
            getPartsData()
        }
    },[autoCompleteState0, loadingData ])

    useEffect(() => { // to update BarGraph One state
        const getPartsData = async () => {
            try {
                const response = await axiosInstance.get('/Builder/find')
                const selectedCardOne = response.data.CardArray.filter((card) => card.CardName === autoCompleteState1)
                if (selectedCardOne.length > 0) {
                    const priceArrOne = selectedCardOne[0].partsData.map((parts) => ( parts.itemPrice ? parseFloat(parts.itemPrice.replace('S$','')) : 0))
                    
                    setBarGraphOne(priceArrOne);

                    setLoadingData(false)
                }
                
            } catch(err) {
                console.log(err.message)
                if (err.message !=="Cannot read property 'map' of null") {
                    ErrorHandlingNotif()
                }
                
            }
        }

        if(loadingData) {
            getPartsData()
        }
    },[autoCompleteState1, loadingData ])

    useEffect(() => { 
        async function getAllCards() {
            try {
                let newData = []
                const response = await axiosInstance.get('/Builder/find')

                
                response.data.CardArray.map((card) => (
                    newData.push(card.CardName)
                ))
                setAutoCompleteData(newData)
                
                
                return [response.data.CardArray, null]
            } catch(err) {
                
                ErrorHandlingNotif()
                return [null, err]
            }
        }
        if (loadingData) {
            getAllCards()
        }
    },[loadingData])


    

    return (
        <div className="flex flex-col items-center h-screen overflow-y-auto bg-trueGray-100 scrollbar-thin">
        
        <CompBuildPageData.Provider value={{ 
                toggleBarGraph, 
                setToggleBarGraph, 
                autoCompletedata, 
                setAutoCompleteState0, autoCompleteState0,
                autoCompleteState1,setAutoCompleteState1,
                BarGraphZero, BarGraphOne,
                setLoadingData
            }}>
            <div className="flex flex-row justify-between flex-shrink-0 w-11/12 px-5 mt-5 space-x-5">
                {/** AutoComplete go here */}
                <AutoComplete id={0}/>
                <AutoComplete id={1}/>
            </div>
            <div className="flex flex-row flex-shrink-0 w-11/12 h-full p-5 space-x-5 justify-evenly">
                {/** Tabs go here */}
                <Tabs id={0}/>
                <Tabs id={1}/>
            </div>
            <div className="flex flex-row flex-shrink-0 w-11/12 px-4 py-3 space-x-3 h-5/6">
                {/** Here goes the Price bar Graph comparison  */}
                <BarGraphTab/>
            </div>
        </CompBuildPageData.Provider>
        </div>
    )
}

export default Compare_Builds