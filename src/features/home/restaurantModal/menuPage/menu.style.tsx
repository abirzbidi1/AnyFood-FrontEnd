import { Card, CardContent, Stack, Typography, styled } from "@mui/material";
import BackGround from '../../../../assets/images/fond-menu.jpg';

export const StyledCard = styled(Card)(({ theme }) => ({
    marginLeft:'5px',
    paddingTop: '15px',
    justifySelf:'center',
    borderRadius: 30,
    width:'99%',
    maxHeight:'90px',
      cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        marginTop:'50px',
        maxHeight:'60px',
        justifySelf:'center',
    },
}));

export const StyledCardSection = styled(Card)(({ theme }) => ({
    marginLeft:'5px',
    paddingTop: '15px',
    justifySelf:'center',
    borderRadius: 30,
    width:'99%',
    maxHeight:'90px',
      cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        marginTop:'50px',
        maxHeight:'60px',
        justifySelf:'center',
    },
}));

export const StyledStack = styled(Stack)`

&:hover {
  backgroundColor: #FFD700; 
}
`;

export const StyledTypography= styled(Typography)(({ theme }) => ({
    marginTop:'50%',

    [theme.breakpoints.down('sm')]: {
        marginTop:'50px',
        justifySelf:'center',
    },
}));

export const CardContentStyle = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    borderRadius: 30,
    backgroundImage: `url(${BackGround})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    color: '#ffffff',

    [theme.breakpoints.down('sm')]: {
        justifyContent: 'left',
        flexDirection: 'column',
        alignItems: 'left',
        padding: '0.5rem',
        margin: '1px',
    },
}));

export const ImageStyle =styled('img')(({ theme }) => ({
    width: '60px',
    height: '60px', 
    borderRadius: '50%', 

    [theme.breakpoints.down('sm')]: {
        width: '40px',
        height: '40px',
      },
    }));

    /*

                        */