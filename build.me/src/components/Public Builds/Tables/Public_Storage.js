import { useState, useEffect, useMemo } from "react"
import { Storage_Columns } from "../../Tables/Columns/Storage_Columns";
import { ErrorHandlingNotif } from "../../Misc/Error";
import axiosInstance from "../../../AxiosInstance";
import Tables from "./Tables";

const Public_Storage = () => {

    const Name = "Storage"
    const [TableData,setTableData] = useState([]);
    const [loadingTableData, setLoadingTableData] = useState(true);

    const data = useMemo(() => {
        return TableData
    }, [TableData]);

    const PayloadAlgo = async () => {
        let payload = {

            "sata6Gb":1

        }
        const Motherboard = JSON.parse(localStorage.getItem("Motherboard"))
        const MotherboardID = Motherboard.itemID

        if (MotherboardID) {
            const response = await axiosInstance.get(`/Mobos/${MotherboardID}`)
            const Motherboardsata6Gb = response.data.sata6Gb;
            payload["sata6Gb"] = Motherboardsata6Gb;
        }

        return payload
    }

    useEffect(() => {
        async function getData() {
            const payload = await PayloadAlgo()
            
            await axiosInstance
                .post('/Storage/', payload)
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
                    <Tables TableColumns={Storage_Columns} Name={Name} data={data} key={Name + " Table"}/>
                </div>}
        </div>
    )
}

export default Public_Storage
