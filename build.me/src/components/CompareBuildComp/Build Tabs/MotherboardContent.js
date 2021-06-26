import { useContext, useState, useEffect } from 'react';
import { ErrorHandlingNotif } from '../../Misc/Error';
import { TabsData } from '../Tabs';
import axiosInstance from '../../../AxiosInstance';
import Asrock from '../../../images/svg/Motherboard/Asrock';

const MotherboardContent = () => {
    
    /** !!
    NEED to CHECK if there is an Item selected in the Build
     */

    const [MoboSpecs, setMoboSpecs] = useState('')
    const { currentPartsData, tabsLoading, setTabsLoading } = useContext(TabsData)
    const Mobo = currentPartsData[1]

    const itemName = Mobo.itemName;
    const itemImg = Mobo.itemImg;
    const itemURL = Mobo.itemURL;
    const itemID = Mobo.itemID;

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
                return (<h1>Motherboard was not selected</h1>)
            } else if (tabsLoading) {
                return (<h1>Loading Please Wait</h1>)
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
                    <Asrock/>
                    {/* <h1 className="mt-2 text-2xl font-poppins">Default</h1> */}
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
            <div className="absolute flex flex-row items-start w-full space-x-5 left-3 -bottom-16">
                <section className="px-5 py-2 text-white duration-300 bg-teal-500 rounded-full shadow-md font-poppins">Total Wattage: 650W</section>
                <a className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                href={itemURL} target="_blank" rel="noreferrer">
                    Store Page
                </a>
                <button className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins">Checkout parts</button>
                
            </div>
                </>)
            }
        })()}
        </div>
    )
}

export default MotherboardContent
