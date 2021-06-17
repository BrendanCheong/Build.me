import { useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
    <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
            onChange({
            target: {
                name: props.name,
                value: values.value,
            },
            });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
        />
    );
    }

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const BudgetBar = ({id}) => {

    const [values, setValues] = useState({
    textmask: '(1  )    -    ',
    numberformat: '',
    });

    const handleChange = (event) => {
    setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="">
            <TextField
                label="Total Budget"
                value={values.numberformat}
                onChange={handleChange}
                name="numberformat"
                id={id.toString()}
                InputProps={{
                inputComponent: NumberFormatCustom,
                }}
                size="small"
                variant="outlined"
                placeholder="Enter Budget Amount"
            />
        </div>
    );
}

export default BudgetBar
