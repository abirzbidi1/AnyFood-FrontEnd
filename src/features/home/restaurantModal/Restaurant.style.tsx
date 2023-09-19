import {Paper, Avatar, styled, Modal, TableCell } from "@mui/material";


export const StyledImage = styled(Avatar)({
    justifyContent: 'center',
    display: 'flex', 
    width: '150px',
    height: '150px',
});

export const PaperStyle = styled(Paper)({
    justifyContent: 'center',
    justifyItems: 'center',
    padding: 20,
    maxWidth: 400,
    borderRadius: 30,
    margin: 'auto',
    width: '100%',
    height: '90%'
  });

  export const StyledModal= styled(Modal)({
    borderColor:'#be1222',
    borderRadius: '25px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'boxShadow 0.3s ease',
    marginTop: "3%",
  });

  export const StyledTableCell= styled(TableCell)({
    borderBottom: "none",
    padding: "0px 0px 0px 0px",
    textTransform: 'capitalize',
  });