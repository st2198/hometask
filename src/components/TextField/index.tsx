import React from 'react';
import { styled } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const StyledTextField = styled(TextField)(() => ({
    backgroundColor: 'white',
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#50C9B7",
            borderWidth: 3
        }
    }
}));

const CustomTextField = (props: TextFieldProps) => {
    return <StyledTextField {...props} />
}


export default CustomTextField;