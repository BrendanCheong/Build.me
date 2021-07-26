import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';


const NumberFormatCustom = (props) => {
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

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#14B8A6',
        borderRadius: '0.5rem',
        '&:hover': {
        backgroundColor:'#0F766E',
        transitionDuration: '500ms'
        }
    },
    }));

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const BudgetBar = ({id, values, setValues, currentPartsData}) => {

    const [totalBudget, setTotalBudget] = useState("");
    const handleChange = (event) => {
        setValues({
                ...values,
                [event.target.name]: event.target.value,
            });
    };

    const valueSetter = () => {
        setValues({
            ...values,
            "numberformat" : totalBudget,
        })
    }

    const classes = useStyles();
    
    useEffect(() => {
        let Total = 0
        for (let item of currentPartsData) {
            
            if (item.itemPrice) {
                const number = item.itemPrice.replace('S$', '')
                const numberPrice = parseFloat(number.replace(',',''))
                Total += numberPrice
            }
        }
        setTotalBudget(Total.toFixed(2))
    },[currentPartsData])

    return (
        <div className="flex flex-row justify-between space-x-6">
            <button className="px-3 text-sm text-center text-white duration-300 rounded-lg w-44 bg-gradient-to-r from-indigo-500 to-purple-500 font-poppins hover:from-indigo-700 hover:to-purple-700" onClick={() => valueSetter()} type="submit">
                <p className="mt-1">{`Total Build Cost: $${totalBudget}`}</p>
            </button>
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
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon>send</SendIcon>}
                type='submit'
            >
                Send
            </Button>
        </div>
    );
}

export default BudgetBar
