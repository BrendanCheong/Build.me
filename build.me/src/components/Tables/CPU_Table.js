import { useState ,useMemo, useEffect} from "react";
import { CPU_COLUMNS } from "./Columns/CPU_Columns";
import { ErrorHandlingNotif } from '../Misc/Error';
import Table from '../Table';
import axiosInstance from "../../AxiosInstance";



const CPUTable = (props) => {

    const Name = "CPU" // change name accordingly for new Tables


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


    const PayloadAlgo = async () => {
        
        let payload = {
            'maxSupMem' : 0,
            'itemSocket': ''
        }
        
        const propData = JSON.parse(localStorage.getItem('propData'))
        const card = propData.card.partsData
        const MotherboardID = card[1].itemID
        const MemoryID = card[3].itemID
        if (MotherboardID) {

            const response = await axiosInstance.get(`/Mobos/${MotherboardID}`)
            console.log(response)
            const MotherboardSocket = response.data.itemSocket
            payload['itemSocket'] = MotherboardSocket
        }

        if (MemoryID) {

            const response = await axiosInstance.get(`/RAMs/${MemoryID}`)
            const MemoryTotalMem = response.data.totalMem
            payload['maxSupMem'] = MemoryTotalMem
        }
        
        return payload
        
    }
    
    useEffect(() => {
        async function getData() {
            const payload = await PayloadAlgo()
            await axiosInstance
                .post('/CPUs/',payload)
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
                    <Table TableColumns={CPU_COLUMNS} Name={Name} data={data} propData={propData} key={Name + " Larry the First"}/>
                </div>}
        </div>
    )
}

export default CPUTable