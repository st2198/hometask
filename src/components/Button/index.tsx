import React from 'react';
import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

const StyledButton = styled(Button)(() => ({
    backgroundColor: "#50C9B7",
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
    paddingRight: "20px",
    paddingLeft: "20px"
}));


const CustomButton = (props: ButtonProps) => {
    return <StyledButton {...props} />
}


export default CustomButton;