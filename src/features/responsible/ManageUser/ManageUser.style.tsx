import { Typography, Box, Card, InputBase, Paper, TableCell, TableContainer } from '@material-ui/core';
import { Fab } from '@mui/material';
import { styled } from '@mui/system';

export const StyleCard = styled(Card)({
    width: '100%',
    justifyContent: 'right',
    backgroundColor: '#E0E5E4'
});

export const BoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '1rem',
    margin: '2px',
    justifyContent: 'flex-end',
  
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0.5rem',
      margin: '1px',
    },
  }));

export const PaperStyle = styled(Paper)({
    padding: '2px',
    borderRadius: '20px'
});

export const TableContainerStyle = styled(TableContainer)({
    width: '80%',
    margin: 'auto',
    borderRadius: 20,
    border: "1px solid black",
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

export const TypographyStyle = styled(Typography)({
    flexGrow: 1,
    marginTop: '10px',
    textAlignLast: 'left',
    fontSize: '25px',
    color: "#404040",
    fontWeight: 'bold'
});

export const FabStyle = styled(Fab)({
    //marginTop: '8px',
    marginLeft: '20px',
});