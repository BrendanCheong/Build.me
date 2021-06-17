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
    const [autoCompleteState0, setAutoCompleteState0] = useState(null) // Trigger BarGraphTab on every render and if theres 2 builds selected
    const [autoCompleteState1, setAutoCompleteState1] = useState(null) // Trigger BarGraphTab on every render and if theres 2 builds selected
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        async function getAllCards() {
            try {
                let newData = []
                const response = await axiosInstance.get('/Builder/find')

                
                response.data.CardArray.map((card) => (
                    newData.push(card.CardName)
                ))
                setAutoCompleteData(newData)
                setLoadingData(false)
                
                    console.log('test')
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