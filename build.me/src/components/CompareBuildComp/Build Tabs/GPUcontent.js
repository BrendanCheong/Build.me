import { useContext, useState, useEffect } from 'react';
import { ErrorHandlingNotif } from '../../Misc/Error';
import { TabsData } from '../Tabs';
import axiosInstance from '../../../AxiosInstance';
import XFX from '../../../images/svg/GPU/XFX';
import Zotac from '../../../images/svg/GPU/Zotac';
import NVIDIA from '../../../images/svg/GPU/NVIDIA';
import EVGA from '../../../images/svg/GPU/EVGA';
import PNY from '../../../images/svg/GPU/PNY';
import Sapphire from '../../../images/svg/GPU/Sapphire';
import PowerColor from '../../../images/svg/GPU/PowerColor';
import Asrock from '../../../images/svg/Motherboard/Asrock';
import GIgabyte from '../../../images/svg/Motherboard/GIgabyte';
import MSI from '../../../images/svg/Motherboard/MSI';
import Asus from '../../../images/svg/Motherboard/Asus';

const GPUcontent = () => {

    const [GPUSpecs, setGPUSpecs] = useState('')
    const { currentPartsData, tabsLoading, setTabsLoading, totalWattage } = useContext(TabsData)
    const GPU = currentPartsData[2]

    const itemName = GPU.itemName;
    const itemImg = GPU.itemImg;
    const itemURL = GPU.itemURL;
    const itemID = GPU.itemID;

    useEffect(() => {
        async function getData() {
            try {

                if (itemID) {

                    const response = await axiosInstance.get(`/GPUs/${itemID}`)
                    setGPUSpecs(response.data);
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
                    <img className="object-contain object-center w-full h-56" src={itemImg} alt="Video Card Product"/>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="items-center text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Brand</h1>
                    {/* <h1 className="mt-2 text-2xl font-poppins">Default</h1> */}
                    {(() => {
                        switch (GPUSpecs.itemBrand) {
                            case 'Gigabyte':
                                return (<GIgabyte/>)
                            case 'PNY':
                                return <PNY/>
                            case 'MSI':
                                return <MSI/>
                            case 'EVGA':
                                return <EVGA/>
                            case 'PowerColor':
                                return <PowerColor/>
                            case 'Sapphire':
                                return <Sapphire/>
                            case 'ASRock':
                                return <Asrock/>
                            case 'NVIDIA':
                                return <NVIDIA/>
                            case 'Asus':
                                return <Asus/>
                            case 'XFX':
                                return <XFX/>
                            case 'Zotac':
                                return <Zotac/>
                            default:
                                return (<h1 className="mt-6 text-3xl font-roboto">{GPUSpecs.itemBrand}</h1>)
                        }
                    })()}
                </section>
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">ChipSet</h1>
                    <h1 className="mt-6 text-2xl font-roboto">{GPUSpecs.itemChipSet}</h1>
                </section>
            </div>
            <div className="flex flex-row space-x-2 justify-evenly">
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Total Memory</h1>
                    <h1 className="pt-5 text-xl font-roboto">{GPUSpecs.itemMem}</h1>
                </section>
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Core Clock</h1>
                    <h1 className="pt-5 text-xl font-roboto">{GPUSpecs.coreClock}</h1>
                </section>
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Boost Clock</h1>
                    <h1 className="pt-5 text-xl font-roboto">{GPUSpecs.boostClock}</h1>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Length</h1>
                    <h1 className="text-xl mt-7 font-roboto">{GPUSpecs.itemLen}</h1>
                </section>
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">GPU TDP</h1>
                    <h1 className="text-xl mt-7 font-roboto">{GPUSpecs.itemTDP}</h1>
                </section>
            </div>
            <div className="absolute flex flex-row items-start w-full space-x-5 left-3 -bottom-24">
                <section className="px-5 py-2 text-white duration-300 bg-teal-500 rounded-full shadow-md font-poppins">{`Total Wattage: ${totalWattage}W`}</section>
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

export default GPUcontent
