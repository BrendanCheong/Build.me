import { SelectFilter } from "../SelectFilter";

export const CPU_COLUMNS = [
    {
        Header: 'Brand',
        accessor: 'itemBrand',
        Filter: SelectFilter,
        
    },
    {
        Header:"Model",
        accessor: "itemName",
        Filter: SelectFilter,
    },
    {
        Header:"Cores",
        accessor: "coreCount",
        Filter: SelectFilter,
    },
    {
        Header: 'Core Clock',
        accessor: 'coreClock',
        Filter: SelectFilter,

    },
    {
        Header: 'Boost Clock',
        accessor: 'boostClock',
        Filter: SelectFilter,
    },
    {
        Header: 'Integrated Graphics',
        accessor: 'integratedGraphics',
        Filter: SelectFilter,
        
    }
]