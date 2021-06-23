import { SelectFilter } from '../SelectFilter';

export const Mobo_Columns = [
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
        Header: 'Socket Type',
        accessor: 'itemSocket',
        Filter:SelectFilter,
    },

    {
        Header: 'Ram Slots',
        accessor: 'ramSlots',
        Filter:SelectFilter,
    },
]