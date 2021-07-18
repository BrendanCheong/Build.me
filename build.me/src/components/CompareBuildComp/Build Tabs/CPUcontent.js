import { useContext, useState, useEffect } from 'react';
import { ErrorHandlingNotif } from '../../Misc/Error';
import { TabsData } from '../Tabs';
import AMD from '../../../images/svg/CPU/AMD';
import Intel from '../../../images/svg/CPU/Intel'
import axiosInstance from '../../../AxiosInstance';
import moment from "moment";
import Modal from "../Modal";

const CPUcontent = () => {
    /** !!
    NEED to CHECK if there is an Item selected in the Build
     */
    const [CPUspecifications, setCPUspecifications] = useState('');
    const [LineChartData, setLineChartData] = useState({nothing: "nothing"});
    const [ChartDataLoading, setChartDataLoading] = useState(true);
    
    const { currentPartsData, tabsLoading, setTabsLoading, totalWattage } = useContext(TabsData)
    const CPU = currentPartsData[0]
    const itemName = CPU.itemName;
    const itemImg = CPU.itemImg;
    const itemURL = CPU.itemURL;
    const itemID = CPU.itemID;

    async function openModal(key) {
        document.getElementById(key).showModal(); 
        document.body.setAttribute('style', 'overflow: hidden;'); 
        document.getElementById(key).children[0].scrollTop = 0; 
        document.getElementById(key).children[0].classList.remove('opacity-0'); 
        document.getElementById(key).children[0].classList.add('opacity-100');

        try {
    
            if (itemURL && LineChartData.nothing === "nothing") {
                console.log("fetching data")
                const response = await axiosInstance.post("/PriceTrends", {
                    link: itemURL,
                })
                const ChartDataPayload = {
                    time: response.data.time.map((seconds) => {
                        const date = new Date(0);
                        date.setUTCSeconds(seconds);
                        const answer = moment(date).format('MMM Do YYYY');
                        return answer;
                    }),
                    prices: response.data.prices,
                }
                setLineChartData(ChartDataPayload);
                setChartDataLoading(false);
            }
            
            return () => setChartDataLoading(true);
        } catch(err) {

            console.error(err.response.data.Error)
            setLineChartData("Error");
        }
        
    }

    function modalClose(key) {
        document.getElementById(key).children[0].classList.remove('opacity-100');
        document.getElementById(key).children[0].classList.add('opacity-0');
        setTimeout(function () {
            document.getElementById(key).close();
            document.body.removeAttribute('style');
        }, 100);
    }

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
            if (!itemName) {
                return (<h1 className="flex flex-col justify-center w-full h-full text-3xl text-center text-trueGray-500 text-opacity-30">CPU was not found in this Build</h1>)
            } else if (tabsLoading) {
                return (<div className="flex flex-col items-center justify-center w-full h-full">
                            <svg className="w-56 h-56 transition duration-300 animate-spin" fill="none" stroke="#6366F1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </div>)
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
                    {(() => {
                        switch (CPUspecifications.itemBrand) {
                            case ('AMD'):
                                return <AMD/>
                            case ('Intel'):
                                return <Intel/>
                            default:
                                return (<h1 className="mt-6 text-3xl font-roboto">{CPUspecifications.itemBrand}</h1>)
                        }
                    })()}
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
                <section className="px-5 py-2 text-white duration-300 bg-teal-500 rounded-full shadow-md font-poppins">{`Total Wattage: ${totalWattage}W`}</section>
                <a className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                href={itemURL} target="_blank" rel="noreferrer">
                    Store Page
                </a>
                <button className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                onClick={() => openModal('CPUModal')}>Price History</button>
                <Modal modalClose={modalClose} ChartDataLoading={ChartDataLoading} LineChartData={LineChartData} name={"CPU"} itemName={itemName}/>
            </div>
                </>)
            }
        })()}
            
        </div>
    )
}

export default CPUcontent
