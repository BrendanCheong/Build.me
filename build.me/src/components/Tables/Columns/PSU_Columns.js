import { SelectFilter } from '../SelectFilter';

export const PSU_Columns = [
    {
        Header: 'Brand',
        accessor: 'itemBrand',
        Filter:SelectFilter,
    },

    {
        Header: 'Model',
        accessor: 'itemName',
        Filter:SelectFilter,
    },

    {
        Header: 'Form Factor',
        accessor: 'formFactor',
        Filter:SelectFilter,
    },

    {
        Header: 'Efficiency',
        accessor: 'effRating',
        Filter:SelectFilter,
    },

    {
        Header: 'Modularity',
        accessor: 'itemModularity',
        Filter:SelectFilter,
    },

    {
        Header: 'Wattage',
        accessor: 'itemWattage',
        Filter:SelectFilter,
    },
]