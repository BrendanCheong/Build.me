import { useContext, useState, useEffect } from 'react';
import { ErrorHandlingNotif } from '../../Misc/Error';
import { TabsData } from '../Tabs';
import axiosInstance from '../../../AxiosInstance';
import Asrock from '../../../images/svg/Motherboard/Asrock';
import GIgabyte from '../../../images/svg/Motherboard/GIgabyte';
import NZXT from '../../../images/svg/Motherboard/NZXT';
import Asus from '../../../images/svg/Motherboard/Asus';
import MSI from '../../../images/svg/Motherboard/MSI';
import moment from "moment";
import Modal from "../Modal";
import axios from "axios"


const MotherboardContent = ({ id }) => {
    
    /** !!
    NEED to CHECK if there is an Item selected in the Build
     */

    const [MoboSpecs, setMoboSpecs] = useState('');
    const [LineChartData, setLineChartData] = useState({nothing: "nothing"});
    const [ChartDataLoading, setChartDataLoading] = useState(true);
    const { currentPartsData, tabsLoading, setTabsLoading, totalWattage } = useContext(TabsData)
    const Mobo = currentPartsData[1]

    const itemName = Mobo.itemName;
    const itemImg = Mobo.itemImg;
    const itemURL = Mobo.itemURL;
    const itemID = Mobo.itemID;
    const itemVendor = Mobo.vendorName

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
                
                let ExchangeAPI;
                if (itemVendor === "Amazon") {
                    const response = await axios.get("https://open.er-api.com/v6/latest/USD")
                    ExchangeAPI = response.data.rates.SGD;
                }
                
                const ChartDataPayload = {
                    time: response.data.time.map((seconds) => {
                        const date = new Date(0);
                        date.setUTCSeconds(seconds);
                        const answer = moment(date).format('MMM Do YYYY');
                        return answer;
                    }),
                    prices: response.data.prices.map((item) => (item * ExchangeAPI).toFixed(2)),
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

                    const response = await axiosInstance.get(`/Mobos/${itemID}`)
                    setMoboSpecs(response.data);
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
                return (<h1 className="flex flex-col justify-center w-full h-full text-3xl text-center text-trueGray-500 text-opacity-30">Motherboard was not found in this Build</h1>)
            } else if (tabsLoading) {
                return (<div className="flex flex-col items-center justify-center w-full h-full">
                            <svg className="w-56 h-56 transition duration-300 animate-spin" fill="none" stroke="#6366F1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </div>)
            } else {
                return (<>
                    <div className="flex items-center justify-center w-full h-full">
                <section className="h-full text-xl w-custom font-poppins">
                    <h1 className="pb-2 text-center">{itemName}</h1>
                    <img className="object-contain object-center w-full h-56" src={itemImg} alt="Motherboard Product"/>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="items-center text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Brand</h1>
                    {(() => {
                        switch (MoboSpecs.itemBrand) {
                            case 'MSI':
                                return (<MSI/>)
                            case 'Asus':
                                return (<Asus/>)
                            case 'Gigabyte':
                                return (<GIgabyte/>)
                            case 'ASRock':
                                return (<Asrock/>)
                            case 'NZXT':
                                return (<NZXT/>)
                            default:
                                return (<h1 className="mt-6 text-3xl font-roboto">{MoboSpecs.itemBrand}</h1>)
                        }
                    })()}
                </section>
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Socket</h1>
                    <h1 className="mt-6 text-4xl font-roboto">{MoboSpecs.itemSocket}</h1>
                </section>
            </div>
            <div className="flex flex-row space-x-2 justify-evenly">
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Memory Type</h1>
                    <h1 className="pt-5 text-xl font-roboto">{MoboSpecs.memType}</h1>
                </section>
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Max Memory</h1>
                    <h1 className="pt-5 text-xl font-roboto">{MoboSpecs.maxSupMem}</h1>
                </section>
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Form Factor</h1>
                    <h1 className="pt-5 text-xl font-roboto">{MoboSpecs.formFactor}</h1>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Ram Slots</h1>
                    <h1 className="text-3xl mt-7 font-roboto">{MoboSpecs.ramSlots}</h1>
                </section>
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">SATA Slots</h1>
                    <h1 className="text-3xl mt-7 font-roboto">{MoboSpecs.sata6Gb}</h1>
                </section>
            </div>
            <div className="absolute flex flex-row items-start w-full space-x-5 left-3 -bottom-96">
                <section className="px-5 py-2 text-white duration-300 bg-teal-500 rounded-full shadow-md font-poppins">{`Total Wattage: ${totalWattage}W`}</section>
                <a className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                href={itemURL} target="_blank" rel="noreferrer">
                    Store Page
                </a>
                <button className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                onClick={() => openModal(`MotherboardModal${id}`)}>Price History</button>
                <Modal modalClose={modalClose} ChartDataLoading={ChartDataLoading} LineChartData={LineChartData} name={"Motherboard"} itemName={itemName} itemVendor={itemVendor} id={id}/>
                
            </div>
                </>)
            }
        })()}
        </div>
    )
}

export default MotherboardContent
