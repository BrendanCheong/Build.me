import { useContext, useState, useEffect } from 'react';
import { ErrorHandlingNotif } from '../../Misc/Error';
import { TabsData } from '../Tabs';
import axiosInstance from '../../../AxiosInstance';

import Sabrent from '../../../images/svg/Storage/Sabrent';
import Samsung from '../../../images/svg/Storage/Samsung';
import WesternDigital from '../../../images/svg/Storage/WesternDigital';
import Seagate from '../../../images/svg/Storage/Seagate';
import SKHynix from '../../../images/svg/Storage/SKHynix';
import Intel from '../../../images/svg/CPU/Intel';
import Kingston from '../../../images/svg/Memory/Kingston';
import Crucial from '../../../images/svg/Memory/Crucial';
import SiliconPower from '../../../images/svg/Memory/SiliconPower';
import ADATA from '../../../images/svg/Memory/ADATA';
import Corsair from '../../../images/svg/Memory/Corsair';


const StorageContent = () => {

    const [StorageSpecs, setStorageSpecs] = useState('')
    const { currentPartsData, tabsLoading, setTabsLoading, totalWattage } = useContext(TabsData)
    const Storage = currentPartsData[5]

    const itemName = Storage.itemName;
    const itemImg = Storage.itemImg;
    const itemURL = Storage.itemURL;
    const itemID = Storage.itemID;

    useEffect(() => {
        async function getData() {
            try {

                if (itemID) {

                    const response = await axiosInstance.get(`/Storage/${itemID}`)
                    setStorageSpecs(response.data);
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
                    <img className="object-contain object-center w-full h-56" src={itemImg} alt="RAM Product"/>
                </section>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <section className="items-center text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Brand</h1>
                    {(() => {
                        switch(StorageSpecs.itemBrand) {
                            case 'Sabrent':
                                return <Sabrent/>
                            case 'Samsung':
                                return <Samsung/>
                            case 'Western Digital':
                                return <WesternDigital/>
                            case 'Seagate':
                                return <Seagate/>
                            case 'Intel':
                                return <Intel/>
                            case 'SK hynix':
                                return <SKHynix/>
                            case 'Silicon Power':
                                return <SiliconPower/>
                            case 'Kingston':
                                return <Kingston/>
                            case 'ADATA':
                                return <ADATA/>
                            case 'Crucial':
                                return <Crucial/>
                            case 'Corsair':
                                return <Corsair/> 
                            default:
                                return (<h1 className="mt-6 text-3xl font-roboto">{StorageSpecs.itemBrand}</h1>)
                        }
                    })()}
                </section>
                <section className="text-center shadow-md bg-warmGray-100 w-72 h-36 rounded-2xl">
                    <h1 className="mt-2 text-2xl font-poppins">Capacity</h1>
                    <h1 className="mt-6 text-3xl font-roboto">{StorageSpecs.itemCapacity}</h1>
                </section>
            </div>
            <div className="flex flex-row space-x-2 justify-evenly">
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Type</h1>
                    <h1 className="pt-5 text-2xl font-roboto">{StorageSpecs.itemType}</h1>
                </section>
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Interface</h1>
                    <h1 className="pt-5 text-xl font-roboto">{StorageSpecs.itemInterface}</h1>
                </section>
                <section className="w-48 pt-3 text-center shadow-md bg-warmGray-100 rounded-2xl h-36">
                    <h1 className="text-2xl font-poppins">Form Factor</h1>
                    <h1 className="pt-5 text-2xl font-roboto">{StorageSpecs.formFactor}</h1>
                </section>
            </div>
            <div className="absolute flex flex-row items-start w-full space-x-5 left-3 -bottom-64">
                <section className="px-5 py-2 text-white duration-300 bg-teal-500 rounded-full shadow-md font-poppins">{`Total Wattage: ${totalWattage}W`}</section>
                <a className="px-5 py-2 text-white duration-300 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-700 font-poppins"
                href={itemURL}
                target="_blank"
                rel="noreferrer">
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

export default StorageContent
