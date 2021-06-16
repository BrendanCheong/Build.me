import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { CompBuildPageData } from '../../pages/Compare_Builds';
import { useContext } from 'react';


const AutoComplete = ({id}) => {

    const { autoCompletedata, autoCompleteState0 ,setAutoCompleteState0, autoCompleteState1,setAutoCompleteState1, } = useContext(CompBuildPageData)
    

    return (
        <>
            <Autocomplete
                id={`Find Build Name ${id}`}
                value={
                    id === 0 ?
                    autoCompleteState0
                    :
                    autoCompleteState1
                }
                onChange={(event, newValue) => {
                id === 0 ?
                setAutoCompleteState0(newValue)
                :
                setAutoCompleteState1(newValue);
                }}
                options={autoCompletedata}
                getOptionLabel={(options) => options}
                style={{width: 250,}}
                clearOnEscape
                renderInput={(params) => <TextField {...params} label="Select Build Name" variant="outlined"/>}
            />
        </>
    )
}

export default AutoComplete
