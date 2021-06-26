import { useContext, useState, useEffect } from 'react';
import { ErrorHandlingNotif } from '../../Misc/Error';
import { TabsData } from '../Tabs';
import AMD from '../../../images/svg/CPU/AMD';
import axiosInstance from '../../../AxiosInstance';

const CPUcontent = ({ CheckOutParts }) => {
    /** !!
    NEED to CHECK if there is an Item selected in the Build
     */
    const [CPUspecifications, setCPUspecifications] = useState('')
    const { currentPartsData, tabsLoading, setTabsLoading } = useContext(TabsData)
    const CPU = currentPartsData[0]

    const itemName = CPU.itemName;
    const itemImg = CPU.itemImg;
    const itemURL = CPU.itemURL;
    const itemID = CPU.itemID;

    useEffect(() => {
        async function getData() {
            try {
                if (itemID) {

                    const response = await axiosInstance.get(`/CPUs/${itemID}`)
                    setCPUspecifications(response.data);
                    setTabsLoading(false);

                } else {
                    setTabsLoading(false);
                }
            } catch(err) {

                console.error(err)
                ErrorHandlingNotif()
            }
        }
        
        if (tabsLoading) {
            getData()
        }
    },[tabsLoading,itemID, setTabsLoading,setCPUspecifications])

    return (

        <div className="relative flex flex-col h-full space-y-5">
        {(() => {
            if (!itemID) {
                return (<h1>CPU was not selected</h1>)
            } else if (tabsLoading) {
                return (<h1>Loading Please Wait</h1>)
            } else {
                return(<>
                    <div className="flex items-center justify-center w-full h-full">
                <section className="h-full text-xl w-custom font-poppins">
                    <h1 className="pb-2">{itemName}</h1>
                    <img className="object-contain object-center w-full h-56" src={itemImg} alt="CPU Product"/>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Brand</h1>
                    <AMD/>
                </section>
                <section className="shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Socket</h1>
                    <h1 className="mt-6 text-4xl font-roboto">{CPUspecifications.itemSocket}</h1>
                </section>
            </div>
            <div className="flex flex-row space-x-2 justify-evenly">
                <section className="w-48 pt-3 shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Core Count</h1>
                    <h1 className="pt-5 text-xl font-roboto">{CPUspecifications.coreCount}</h1>
                </section>
                <section className="w-48 pt-3 shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Core Clock</h1>
                    <h1 className="pt-5 text-xl font-roboto">{CPUspecifications.coreClock}</h1>
                </section>
                <section className="w-48 pt-3 shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Boost Clock</h1>
                    <h1 className="pt-5 text-xl font-roboto">{CPUspecifications.boostClock}</h1>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">TDP</h1>
                    <h1 className="text-4xl mt-7 font-roboto">{CPUspecifications.itemTDP}</h1>
                </section>
                <section className="shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Integrated Graphics</h1>
                    <h1 className="text-xl mt-7 font-roboto">{CPUspecifications.integratedGraphics}</h1>
                </section>
            </div>
            <div className="absolute flex flex-row items-start w-full space-x-5 left-3 -bottom-96">
                <section className="px-5 py-2 text-white duration-300 bg-teal-500 rounded-full shadow-md font-poppins">Total Wattage: 650W</section>
                <a className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                href={itemURL} target="_blank" rel="noreferrer">
                    Store Page
                </a>
                <button className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                onClick={CheckOutParts}>Checkout parts</button>
                
            </div>
                </>)
            }
        })()}
            
        </div>
    )
}

export default CPUcontent
