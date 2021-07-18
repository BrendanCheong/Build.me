import { useContext, useState, useEffect } from 'react';
import { ErrorHandlingNotif } from '../../Misc/Error';
import { TabsData } from '../Tabs';
import axiosInstance from '../../../AxiosInstance';
import TeamGroup from '../../../images/svg/Memory/TeamGroup';
import Corsair from '../../../images/svg/Memory/Corsair';
import GSKill from '../../../images/svg/Memory/GSkill';
import Kingston from '../../../images/svg/Memory/Kingston';
import Crucial from '../../../images/svg/Memory/Crucial';
import Patriot from '../../../images/svg/Memory/Patriot';
import ADATA from '../../../images/svg/Memory/ADATA';
import GIgabyte from '../../../images/svg/Motherboard/GIgabyte';
import SiliconPower from '../../../images/svg/Memory/SiliconPower';
import moment from "moment";
import Modal from "../Modal";



const MemoryContent = () => {

    const [RAMSpecs, setRAMSpecs] = useState('');
    const [LineChartData, setLineChartData] = useState({nothing: "nothing"});
    const [ChartDataLoading, setChartDataLoading] = useState(true);
    const { currentPartsData, tabsLoading, setTabsLoading, totalWattage } = useContext(TabsData)
    const RAM = currentPartsData[3]

    const itemName = RAM.itemName;
    const itemImg = RAM.itemImg;
    const itemURL = RAM.itemURL;
    const itemID = RAM.itemID;

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

                    const response = await axiosInstance.get(`/RAMs/${itemID}`)
                    setRAMSpecs(response.data);
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
    },[tabsLoading,itemID, setTabsLoading])

    return (
        <div className="relative flex flex-col h-full space-y-4">
            {(() => {
            if (!itemID) {
                return (<h1 className="flex flex-col justify-center w-full h-full text-3xl text-center text-trueGray-500 text-opacity-30">Memory was not found in this Build</h1>)
            } else if (tabsLoading) {
                return (<div className="flex flex-col items-center justify-center w-full h-full">
                            <svg className="w-56 h-56 transition duration-300 animate-spin" fill="none" stroke="#6366F1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </div>)
            } else {
                return (<>
                    <div className="flex items-center justify-center w-full h-full">
                <section className="h-full text-xl w-custom font-poppins">
                    <h1 className="pb-2 text-center">{itemName}</h1>
                    <img className="object-contain object-center w-full h-56" src={itemImg} alt="RAM Product"/>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="items-center text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Brand</h1>
                    {/* <h1 className="mt-2 text-2xl font-poppins">Default</h1> */}
                    {(() => {
                        switch (RAMSpecs.itemBrand) {
                            case 'Corsair':
                                return <Corsair/>
                            case 'G.Skill':
                                return <GSKill/>
                            case 'Kingston':
                                return <Kingston/>
                            case 'Crucial':
                                return <Crucial/>
                            case 'Gigabyte':
                                return <GIgabyte/>
                            case 'Patriot':
                                return <Patriot/>
                            case 'Silicon Power':
                                return <SiliconPower/>
                            case 'Team':
                                return <TeamGroup/>
                            case 'ADATA':
                                return <ADATA/>
                            default:
                                return (<h1 className="mt-6 text-3xl font-roboto">{RAMSpecs.itemBrand}</h1>)
                        }
                    })()}
                </section>
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Memory Speed</h1>
                    <h1 className="mt-6 text-3xl font-roboto">{RAMSpecs.memSpeed}</h1>
                </section>
            </div>
            <div className="flex flex-row space-x-2 justify-evenly">
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Total Memory</h1>
                    <h1 className="pt-5 text-4xl font-roboto">{`${RAMSpecs.totalMem} GB`}</h1>
                </section>
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">ECC status</h1>
                    <h1 className="pt-5 text-xl font-roboto">{RAMSpecs.itemEccRegistered}</h1>
                </section>
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Timing</h1>
                    <h1 className="pt-5 text-2xl font-roboto">{RAMSpecs.itemTiming}</h1>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Cas Latency</h1>
                    <h1 className="text-4xl mt-7 font-roboto">{RAMSpecs.itemCasLatency}</h1>
                </section>
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">First Word Latency</h1>
                    <h1 className="text-4xl mt-7 font-roboto">{RAMSpecs.firstWordLatency}</h1>
                </section>
            </div>
            <div className="absolute flex flex-row items-start w-full space-x-5 left-3 -bottom-24">
                <section className="px-5 py-2 text-white duration-300 bg-teal-500 rounded-full shadow-md font-poppins">{`Total Wattage: ${totalWattage}W`}</section>
                <a className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                href={itemURL}
                target="_blank"
                rel="noreferrer">
                    Store Page
                </a>
                <button className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                onClick={() => openModal('MemoryModal')}>Price History</button>
                <Modal modalClose={modalClose} ChartDataLoading={ChartDataLoading} LineChartData={LineChartData} name={"Memory"} itemName={itemName}/>
                
            </div>
                </>)
            }
            })()}
        </div>
    )
}

export default MemoryContent
