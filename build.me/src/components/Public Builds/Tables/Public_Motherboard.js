import { useState, useEffect, useMemo } from "react"
import { Mobo_Columns } from "../../Tables/Columns/Mobo_Columns";
import { ErrorHandlingNotif } from "../../Misc/Error";
import axiosInstance from "../../../AxiosInstance";
import Tables from "./Tables";

const Public_Motherboard = () => {


    const Name = "Motherboard"
    const [TableData,setTableData] = useState([]);
    const [loadingTableData, setLoadingTableData] = useState(true);

    const data = useMemo(() => {
        return TableData
    }, [TableData]);

    const PayloadAlgo = async () => {
        let payload = {

            "itemSocket": "",
            "memSpeed": "",
            "maxSupMem": "",
            "ramSlots": 0,
            "itemECC": "",
            "itemInterface": "",
            "formFactor": ""
        }

        const Memory = JSON.parse(localStorage.getItem('Memory'))
        const Storage = JSON.parse(localStorage.getItem('Storage'))
        const PSU = JSON.parse(localStorage.getItem('PSU'))
        const MemoryID = Memory.itemID
        const StorageID = Storage.itemID
        const CPUID = PSU.itemID

        if (CPUID) {
            const response = await axiosInstance.get(`/CPUs/${CPUID}`)
            const CPUSocket = response.data.itemSocket
            payload['itemSocket'] = CPUSocket
        }

        if (StorageID) {
            const response = await axiosInstance.get(`/Storage/${StorageID}`)
            const StorageInterface = response.data.itemInterface
            const StorageformFactor = response.data.formFactor
            payload['itemInterface'] = StorageInterface
            payload['formFactor'] = StorageformFactor
        }

        if (MemoryID) {
            const response = await axiosInstance.get(`/RAMs/${MemoryID}`)
            const RAMmemSpeed = response.data.memSpeed
            const RAMtotalMem = response.data.totalMem
            const ECCregistered = response.data.itemEccRegistered
            if (ECCregistered === 'ECC / Registered') {
                payload['itemECC'] = 'Yes'
            } else {
                payload['itemECC'] = 'No'
            }
            payload["memSpeed"] = RAMmemSpeed
            payload["maxSupMem"] = RAMtotalMem
        }

        return payload
    }

    useEffect(() => {
        async function getData() {
            const payload = await PayloadAlgo()
            await axiosInstance
                .post('/Mobos/',payload)
                .then((response) => {
                    setTableData(response.data)
                    setLoadingTableData(false) // swap this with true to see the loading skeleton 
                })
                .catch((err) => ErrorHandlingNotif())
            
    
        }
        if (loadingTableData) {
            getData()
            
        }
    }, [loadingTableData])

    const css = `
    .loader {
        border-top-color: #6366f1;
        -webkit-animation: spinner 1.5s linear infinite;
        animation: spinner 1.5s linear infinite;
    }
    
    @-webkit-keyframes spinner {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    `

    return (
        <div>
        {/* <button onClick={() => console.log(propData.card)}>test</button> */}
            {loadingTableData ?
                <div className="flex flex-col items-center justify-center pt-48">
                    <style>{css}</style>
                    <div className="w-64 h-64 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader">
                    </div>
                </div>

                :
                <div className="p-4 overflow-x-auto bg-gray-100 scrollbar-thin scrollbar-thumb-trueGray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-blueGray-500">
                    <Tables TableColumns={Mobo_Columns} Name={Name} data={data} key={Name + " Table"}/>
                </div>}
        </div>
    )
}

export default Public_Motherboard
