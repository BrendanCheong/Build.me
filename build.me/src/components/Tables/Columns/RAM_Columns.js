import { SelectFilter } from "../SelectFilter";

export const RAM_Columns = [
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
        Header: 'Modules',
        accessor: 'memModule',
        Filter:SelectFilter,
    },

    {
        Header: 'Speed',
        accessor: 'memSpeed',
        Filter:SelectFilter,
    },
    {
        Header: 'ECC Status',
        accessor: 'itemEccRegistered' ,
        Filter:SelectFilter,
    },
]