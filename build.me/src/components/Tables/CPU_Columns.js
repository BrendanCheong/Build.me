import { SelectFilter } from "./SelectFilter";

export const CPU_COLUMNS = [
    {
        Header: 'Brand',
        accessor: 'Brand',
        Filter: SelectFilter,
        
    },
    {
        Header:"Model",
        accessor: "Model Name",
        Filter: SelectFilter,
    },
    {
        Header:"Cores",
        accessor: "Core Count",
        Filter: SelectFilter,
    },
    {
        Header: 'Core Clock',
        accessor: 'Core Clock',
        Filter: SelectFilter,

    },
    {
        Header: 'Boost Clock',
        accessor: 'Boost Clock',
        Filter: SelectFilter,
    },
    {
        Header: 'Integrated Graphics',
        accessor: 'Integrated Graphics',
        Filter: SelectFilter,
        
    }
]