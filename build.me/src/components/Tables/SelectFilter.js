import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useMemo, useState } from "react";

export const SelectFilter = ({column}) => {
    /**
    FIXIT:
    Fix the bug where value is messed up, check stackoverflow for solution
     */
    const {filterValue, setFilter, preFilteredRows, id} = column
    const [value, setValue] = useState(filterValue)
    const [inputValue, setInputValue] = useState(undefined)
    const options = useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows]) // options is a list of categories per column
    /** IMPORTANT NOTE:
    MaterialUI AutoComplete does not seem to work for INT, BOOL, FLOAT,
    It ONLY WORKS for STR values.
    I have to filter the data either server side before extracting to local side
    */
    return (
        <>
            <Autocomplete
                value={value || ''}
                onChange={(event,newValue) => {
                    setValue(newValue);
                    console.log(newValue);
                    setFilter(newValue || undefined);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputChange) => {
                    setInputValue(newInputChange);
                    console.log(newInputChange);
                    setFilter(newInputChange || undefined);
                }}
                id="Select Filterer for Table"
                options={options}
                style={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="" variant="outlined"/>}
            /> 
        </>
    )
}


