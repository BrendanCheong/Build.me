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
    const [inputValue, setInputValue] = useState(null)
    const options = useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        const inputArr = [...options.values()]
        const sortedArr = inputArr.sort((a,b) => a.normalize().localeCompare(b.normalize()))
        return sortedArr
    }, [id, preFilteredRows]) // options is a list of categories per column
    /** IMPORTANT NOTE:
    MaterialUI AutoComplete does not seem to work for INT, BOOL, FLOAT,
    It ONLY WORKS for STR values.
    I have to filter the data either server side before extracting to local side
    */
    return (
        <>
            <Autocomplete
                value={value ? value : null}
                onChange={(event,newValue) => {
                    setValue(newValue);
                    setFilter(newValue || undefined);
                }}
                key={id}
                inputValue={inputValue}
                onInputChange={(event, newInputChange) => {
                    setInputValue(newInputChange);
                }}
                id={`Select Filterer for ${id}`}
                options={options}
                style={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="" variant="outlined"/>}
                getOptionSelected={(option, value) => option === value}
            /> 
        </>
    )
}


