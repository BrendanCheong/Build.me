import { useState ,useMemo, useEffect, useCallback} from "react";
import { RAM_Columns } from "./Columns/RAM_Columns";
import Table from '../Table';
import axiosInstance from "../../AxiosInstance";



const RAMTable = (props) => {

    const Name = "Memory" // change name accordingly for new Tables


    const [propData, setPropData] = useState(props.location.data)
    const [TableData,setTableData] = useState([])
    const [loadingTableData, setLoadingTableData] = useState(true)
    
    const data = useMemo(() => {
        return TableData
    }, [TableData]);


    useEffect(()=>{
        
        if (!propData || !props.location.data) {
            setPropData(JSON.parse(localStorage.getItem('propData')))
        } else {
            localStorage.setItem('propData', JSON.stringify(props.location.data))
        }
    },[]);


    // const PayloadAlgo = async () => {
        
    //     let payload = {
    //         'maxSupMem' : 0,
    //         'itemSocket': ''
    //     }
        
    //     const propData = JSON.parse(localStorage.getItem('propData'))
    //     const card = propData.card.partsData
    //     const MotherboardID = card[1].itemID
    //     const MemoryID = card[3].itemID
    //     if (MotherboardID) {

    //         const MotherboardSocket = await axiosInstance.get(`/Mobo/${MotherboardID}`).data.itemSocket
    //         payload['itemSocket'] = MotherboardSocket
    //     }

    //     if (MemoryID) {

    //         const MemoryTotalMem = await axiosInstance.get(`/RAMs/${MemoryID}`).data.totalMem
    //         payload['maxSupMem'] = MemoryTotalMem
    //     }
        
    //     return payload
        
    // }
    
    useEffect(() => {
        async function getData() {
            // const payload = await PayloadAlgo()
            // console.log(payload)
            await axiosInstance
                .get('/RAMs/')
                .then((response) => {
                    setTableData(response.data)
                    setLoadingTableData(false) // swap this with true to see the loading skeleton 
                });
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
                    <Table TableColumns={RAM_Columns} Name={Name} data={data} propData={propData} key={Name + " Larry the RAM"}/>
                </div>}
        </div>
    )
}

export default RAMTable