import React from 'react';
import Radio from '@mui/material/Radio';

type RadioButtonProp = {
    icon: React.ReactNode,
    value: 'message' | 'phone' | 'coffee' | 'beer' | 'meeting note'
    checked: boolean,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    testId?: string,
};

const RadioButton = ({ icon, value, checked, handleChange, testId }: RadioButtonProp) => {
    return (
        <Radio
            data-testid={testId}
            value={value}
            icon={icon}
            checkedIcon={icon}
            checked={checked}
            onChange={handleChange}
            sx={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                marginRight: '6px',

                "&.Mui-checked":{
                    backgroundColor: "#5BC5DD",
                    borderColor: "#5BC5DD",
                    color: "#fff"
                }
            }}
        />
    );
};

export default RadioButton;
