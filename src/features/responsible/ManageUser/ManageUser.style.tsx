import { Avatar, Box, Card, InputBase, Paper, TableCell, TableContainer } from '@material-ui/core';
import { styled } from '@mui/system';

export const StyleCard = styled(Card)({
    width: '100%',
    justifyContent: 'right',
    bgcolor: '#E0E5E4'
});

export const BoxStyle = styled(Box)({
    display: 'flex',
    padding: '1rem',
    margin: '2px',
    backgroundColor: '',
    //bgcolor: 'background.paper',
    borderRadius: '10',
    justifyContent: 'flex-end'
});

export const PaperStyle = styled(Paper)({
    padding: '1px',
    marginRight: '1rem',
    display: 'flex',
    width: '40%'
});

export const TableContainerStyle = styled(TableContainer)({
    maxHeight: "400px",
    width: '90%',
    margin: 'auto'
});

export const InputBaseStyle = styled(InputBase)({
    marginLeft: '10px',
    flex: 1
});

export const TableCellStyle = styled(TableCell)({
    fontSize: "1rem",
    color: "#000000",
    background: "#CACACA",
    borderBottom: "1px solid black",
});

export const AvatarStyle = styled(Avatar)({
  
});