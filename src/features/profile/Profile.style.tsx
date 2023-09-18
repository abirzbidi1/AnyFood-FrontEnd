import { Avatar, Box, Card, Fab, Paper, styled, Typography } from "@mui/material";

export const StyleCard = styled(Card)(({ theme }) => ({
  padding: 20,
  maxWidth: '100%',
  minHeight: 450,
  borderRadius: 30,
  margin: 'auto',
  width: '90%',
  '@media (max-width: 600px)': {
    width: '100%',
    margin: 0,
    borderRadius: 0,
  },
}));

export const PaperStyle = styled(Paper)({
    padding: '2px',
    borderRadius: '20px'
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
export const TypographyStyle = styled(Typography)({
    flexGrow: 1,
    marginTop: '10px',
    textAlignLast: 'left',
    fontSize: '25px',
    color: "#404040",
    fontWeight: 'bold'
});
export const FabStyle = styled(Fab)({
    marginLeft: '20px',
});

export const AvatarStyle = styled(Avatar)({
    width: '100px',
    height: '100px'
});

export const BoxContentStyle = styled(Box)({
    marginTop: '3%',
    marginLeft: '10%',
    marginRight: '10%',
});
