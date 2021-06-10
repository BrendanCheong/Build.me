import { useState ,useMemo, useEffect} from "react";
import { CPU_COLUMNS } from "./CPU_Columns";
import Table from '../Table';
import axiosInstance from "../../AxiosInstance";



const CPUTable = (props) => {

    const Name = "CPU" // change name accordingly for new Tables

    const propData = props.location.data;    
    const [TableData,setTableData] = useState([])
    const [loadingTableData, setLoadingTableData] = useState(true)

    const data = useMemo(() => {
        return TableData
    }, [TableData]);

    useEffect(() => {
        async function getData() {
            await axiosInstance
                .get('/CPUs/')
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
            {loadingTableData ?
                <div className="flex flex-col items-center justify-center pt-48">
                    <style>{css}</style>
                    <div className="w-64 h-64 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader">
                    </div>
                </div>

                :
                <div className="p-4 overflow-auto">
                    <Table TableColumns={CPU_COLUMNS} Name={Name} data={data} propData={propData}/>
                </div>}
        </div>
    )
}

export default CPUTable