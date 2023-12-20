import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const CustomPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    backgroundColor: '#f6f6f6',
    position: 'relative',
  }));


export default CustomPaper;