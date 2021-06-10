import TextField from '@material-ui/core/TextField';

const LoginInput = ({label, setUsername, setEmail, setPassword, ErrorState, setPasswordVerify, width}) => {

    const reducer = (label, event) => {
        switch(label) {
            case 'Username':
                setUsername(event.target.value)
                break;
            case 'Password':
                setPassword(event.target.value)
                break;
            case 'Email':
                setEmail(event.target.value)
                break;
            case "Confirm Password":
                setPasswordVerify(event.target.value)
                break;
            default:
                break;
        }
    }
    
    return (
        <>
            <TextField className="font-poppins"
                label={label}
                variant="filled"
                color="primary"
                error={ErrorState}
                onChange={(event) => (reducer(label, event))}
                type={label==="Confirm Password" ? "Password" : label}
                size='small'
                fullWidth={width}
            />
        </>
    )
}

export default LoginInput
