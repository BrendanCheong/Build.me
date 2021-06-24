import { SelectFilter } from '../SelectFilter';

export const Storage_Columns = [
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
        Header: 'Capacity',
        accessor: 'itemCapacity',
        Filter:SelectFilter,
    },

    {
        Header: 'Cache Size',
        accessor: 'itemCache',
        Filter:SelectFilter,
    },

    {
        Header: 'Interface',
        accessor: 'itemInterface',
        Filter:SelectFilter,
    },

    {
        Header: 'Form Factor',
        accessor: 'formFactor',
        Filter:SelectFilter,
    },
]