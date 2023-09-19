import { Fab, styled } from "@mui/material";


export const StyledFab = styled(Fab)(({ theme }) => ({

   // borderRadius: 30,
    width:40,
    height:2,
      cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        justifySelf:'center',
    },
}));