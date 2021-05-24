import { useMemo } from "react";
import { useTable, usePagination, useFilters } from "react-table";
import MOCK_DATA_CPU from "../../MOCK_DATA/MOCK_DATA_CPU.json";
import { CPU_COLUMNS } from "./CPU_Columns";


const CPUTable = () => {

    const columns = useMemo(() => CPU_COLUMNS, []);
    const data = useMemo(() => MOCK_DATA_CPU, []);
    
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
        <div className ="flex items-center min-h-screen px-4">
            <div className="flex flex-col justify-center w-full overflow-x-auto">
                {/** Table Start */}
                <table {...getTableProps()} className='w-full max-w-4xl mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg shadow-md whitespace-nowrap'>
                    <thead className="bg-indigo-200">
                        {
                            headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="text-left text-gray-600">
                                    {
                                        headerGroup.headers.map( column => (
                                            <th {...column.getHeaderProps()}
                                            className="px-6 py-4 text-sm font-semibold uppercase font-poppins">
                                            {column.render('Header')}
                                                <div>
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
                                    <tr {...row.getRowProps()} onClick={() => console.table(row.original)} className="transition duration-200 cursor-pointer hover:bg-indigo-500 hover:text-white hover:underline "> {/** Onclick this will log out the row infomation */}
                                        {
                                            row.cells.map( cell => {
                                                return (
                                                <td {...cell.getCellProps()} className="px-6 py-4">
                                                    {cell.render('Cell')}
                                                </td>)
                                            })
                                        }
                                    </tr>
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
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <button className={canNextPage ? "flex items-center px-10 py-4 ml-2 font-bold text-white bg-indigo-500 border rounded-md hover:bg-transparent hover:text-indigo-500 hover:border-indigo-500" : "flex items-center px-10 py-2 ml-2 font-bold"}
                    onClick={() => nextPage()} disabled={!canNextPage}>
                        <p>Next page</p>
                        <svg className="w-5 h-5 ml-2 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
                {/** Pagination end */}
            </div>
        </div>
    )
}

export default CPUTable