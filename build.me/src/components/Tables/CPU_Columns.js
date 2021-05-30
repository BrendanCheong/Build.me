import { SelectFilter } from "./SelectFilter";

export const CPU_COLUMNS = [
    {
        Header: 'Brand',
        accessor: 'Brand',
        Filter: SelectFilter,
        
    },
    {
        Header:"Model",
        accessor: "Name",
        Filter: SelectFilter,
    },
    {
        Header:"Cores",
        accessor: "Core_Count",
        Filter: SelectFilter,
    },
    {
        Header: 'Core Clock',
        accessor: 'Core_Clock',
        Filter: SelectFilter,

    },
    {
        Header: 'Boost Clock',
        accessor: 'Boost_Clock',
        Filter: SelectFilter,
    },
    {
        Header: 'Integrated Graphics',
        accessor: 'Integrated_Graphics',
        Filter: SelectFilter,
        
    }
]