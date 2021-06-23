import { SelectFilter } from "../SelectFilter";

export const GPU_COLUMNS = [
    {
        Header:'Brand',
        accessor: 'itemBrand',
        Filter:SelectFilter,
    },

    {
        Header: 'Model',
        accessor: 'itemChipSet',
        Filter:SelectFilter,
    },

    {
        Header: 'Core Clock',
        accessor: 'coreClock',
        Filter:SelectFilter,
    },

    {
        Header: 'Boost Clock',
        accessor: 'boostClock',
        Filter:SelectFilter,
    },

    {
        Header: 'Total Memory',
        accessor: 'itemMem',
        Filter:SelectFilter,
    }
]