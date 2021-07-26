import { useState ,useMemo, createContext,} from "react";
import { useTable, usePagination, useFilters } from "react-table";
import { ErrorHandlingNotif } from "../../Misc/CustomizableError";
import Modal from "../Modals/Modal";
import axiosInstance from "../../../AxiosInstance";

export const TableDataContext = createContext(null);

const Tables = ({TableColumns, Name, data }) => {

    const [infoState, setInfoState] = useState(null) // infostate is the Scrapped data from e-comms FOR AMAZON
    const [ShopeeInfo, setShopeeInfo] = useState(null)
    const [Qo10Info, setQo10Info] = useState(null)
    const [isAmazonModalLoading, setIsAmazonModalLoading] = useState(true) // this is to see whether skeletal boxes are needed FOR AMAZON
    const [isShopeeModalLoading, setIsShopeeModalLoading] = useState(true)
    const [isQo10ModalLoading, setIsQo10ModalLoading] = useState(true)
    const [rowOriginal, setRowOriginal] = useState("")


    const columns = useMemo(() => TableColumns, [TableColumns]); // columns


    const AmazonScrapper = async (input) => {
        try {
            // process input to remove spaces
            const Input = encodeURIComponent(input)
            const response = await axiosInstance.get(`/Ascrapper/${Input}`,{withCredentials: false})
            const AmazonResponse = DataCleaner(response.data)
            setInfoState(AmazonResponse);
            setIsAmazonModalLoading(false);

        } catch(err) {
            console.error(err)
            ErrorHandlingNotif("Amazon Data Error", "Server Timeout, No Data from Amazon Found")
        }
    };

    const ShopeeScrapper = async (input) => {
        try {

            const Input = encodeURIComponent(input);
            const response = await axiosInstance.get(`/ShopeeScrapper/${Input}`, {withCredentials: false})
            const ShopeeResponse = DataCleaner(response.data)
            setShopeeInfo(ShopeeResponse)
            setIsShopeeModalLoading(false);
            
        } catch(err) {
            console.error(err)
            ErrorHandlingNotif("Shopee Data Error", "Server Timeout, No Data from Shopee Found")
        }
    }

    const Qo10Scrapper = async (input) => {
        try {

            const Input = encodeURIComponent(input)
            const response = await axiosInstance.get(`/Qo10Scrapper/${Input}`, {withCredentials: false})
            return response.data
        } catch(err) {
            console.error(err)
            ErrorHandlingNotif("Qo10 Data Error", "Server Timeout, No Data from Qo10 Found")
        }
    }


    //Evaluate Input based on Name
    const Evaluate = (RowInfo) => {
        switch(Name) {
            case 'GPU':
                return `${RowInfo.itemBrand} ${RowInfo.itemChipSet}`
            default:
                return `${RowInfo.itemBrand} ${RowInfo.itemName}`
        }
    }

    // DataCleaners
    const DataCleaner = (info) => {
        const ChosenArray = []
        for (let i = 0 ; i < info.length; ++i) {
            if (!info[i]) {

                continue
                
            } else {

                const Price = info[i].itemPrice
                if (Price !== "NA") {

                    ChosenArray.push(info[i])
                    
                }
            }
            
        }
        return ChosenArray
    }

    const AScrapper = async (RowInfo) => {  // need the switch statement here

        try {

            // console.log(RowInfo)
            // evaluate the technique to input into the Scrappers
            setIsAmazonModalLoading(true)
            setIsShopeeModalLoading(true)
            setIsQo10ModalLoading(true)
            setRowOriginal(RowInfo)
            openModal(`${Name} Modal`)
            const ScrapperInput = Evaluate(RowInfo)
            
            await AmazonScrapper(ScrapperInput)
            await ShopeeScrapper(ScrapperInput)
            const Qo10Output = await Qo10Scrapper(ScrapperInput)
            
            const Qo10Response = DataCleaner(Qo10Output)

            
            
            setQo10Info(Qo10Response)
            
            setIsQo10ModalLoading(false)
        } catch(err) {

            console.error(err)
        }

    }


    const ScrapAll = (info) => {
        
        AScrapper(info)
        return
    }

    function openModal(key) {
        document.getElementById(key).showModal(); 
        document.body.setAttribute('style', 'overflow: hidden;'); 
        document.getElementById(key).children[0].scrollTop = 0; 
        document.getElementById(key).children[0].classList.remove('opacity-0'); 
        document.getElementById(key).children[0].classList.add('opacity-100');
    }

    function modalClose(key) {
        
        document.getElementById(key).children[0].classList.remove('opacity-100');
        document.getElementById(key).children[0].classList.add('opacity-0');
        setTimeout(function () {
            document.getElementById(key).close();
            document.body.removeAttribute('style');
        }, 100);
        setIsAmazonModalLoading(true);
        setIsShopeeModalLoading(true);
        setIsQo10ModalLoading(true);
    }

    const tableInstance = useTable(
        {
            columns,
            data
        },  useFilters,
            usePagination,
        )

    const { getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage, 
        prepareRow,
        pageOptions,
        state,
    } = tableInstance;

    const { pageIndex } = state;

    return ( 
        <div className ="flex items-start min-h-screen px-4 py-4">
            <div className="flex flex-col justify-center w-full">
                {/** Table Start */}
                <table {...getTableProps()} className='w-full max-w-4xl mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg shadow-md whitespace-nowrap'>
                    <thead className="bg-indigo-200">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="text-left text-gray-600" key={69}>
                                { headerGroup.headers.map( column => (
                                    <th {...column.getHeaderProps()} className="px-6 py-4 text-sm font-semibold uppercase font-poppins" key={column.Header} >
                                    {column.render('Header')}
                                        <div key={column.Header}>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <>
                                        <tr {...row.getRowProps()} onClick={() => ScrapAll(row.original)} className="transition duration-200 cursor-pointer hover:bg-indigo-500 hover:text-white hover:underline" key={row.id}>
                                            { row.cells.map( cell => {
                                                return (
                                                    <td {...cell.getCellProps()} className="px-6 py-4" key={cell.value} name={cell.value}>
                                                        {cell.render('Cell')}
                                                    </td>)
                                            })
                                            }
                                        </tr>
                                    </>
                                )
                            })
                        }
                        
                    </tbody>
                {/** Table end */}
                </table>
                {/** Pagination Buttons */}
                <div className="flex items-center justify-center flex-1 p-8 space-x-3">
                    <button className={canPreviousPage ? "flex items-center content-start px-6 py-4 mr-2 space-x-2 font-bold text-indigo-500 border border-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white" : "flex items-center content-start px-6 py-4 mr-2 space-x-2 font-bold"}
                    onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <svg className="flex w-5 h-5 ml-2 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <p>Previous page</p>
                    </button>
                    <span className="flex flex-row space-x-2">
                        <p>{'Page'}</p>
                        <p className="font-bold">{`${pageIndex + 1} of ${pageOptions.length}`}</p>
                    </span>
                    <button className={canNextPage ? "flex items-center px-10 py-4 ml-2 font-bold text-white bg-indigo-500 border rounded-md hover:bg-transparent hover:text-indigo-500 hover:border-indigo-500" : "flex items-center px-10 py-2 ml-2 font-bold"}
                    onClick={() => nextPage()} disabled={!canNextPage} name="Next Page">
                        <p>Next page</p>
                        <svg className="w-5 h-5 ml-2 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
                {/** Pagination end */}
            </div>
            <TableDataContext.Provider value={{

                openModal, modalClose,
                infoState, setInfoState, 
                ShopeeInfo,
                Qo10Info,
                Name, Evaluate,
                isAmazonModalLoading, setIsAmazonModalLoading,
                isShopeeModalLoading,
                isQo10ModalLoading,
                rowOriginal, setRowOriginal,
                
                }} key={`${Name} Modals`}> 
                    <Modal key={`${Name} Modal`}/>
            </TableDataContext.Provider>
        </div>
    )
}

export default Tables

