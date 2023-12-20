import React from 'react';
import Radio from '../RadioButton';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import PersonIcon from '@mui/icons-material/Person';

type RadioButtonProps = {
    value?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};
const RadioButton = ({ value, onChange }: RadioButtonProps) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '12px'
    }}>
        <Radio icon={<ChatBubbleIcon />} value='message' checked={value === 'message'} handleChange={onChange} />
        <Radio icon={<LocalPhoneIcon />} value='phone' checked={value === 'phone'} handleChange={onChange} testId='phone' />
        <Radio icon={<LocalCafeIcon />} value='coffee' checked={value === 'coffee'} handleChange={onChange} />
        <Radio icon={<SportsBarIcon />} value='beer' checked={value === 'beer'} handleChange={onChange} />
        <Radio icon={<PersonIcon />} value='meeting note' checked={value === 'meeting note'} handleChange={onChange} />
    </div>
);

export default RadioButton;
