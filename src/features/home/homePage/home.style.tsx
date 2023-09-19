import { Grid, styled, CardContent ,InputBase, Card, Paper, Box, Typography, CardMedia} from "@mui/material";

export const InputBaseStyle = styled(InputBase)({
  marginLeft: '10px',
  flex: 1,
   border: "1px solid gray",
borderRadius: 20,
opacity: '50%'
});

export const StyleCard = styled(Card)({
  width: '100%',
  justifyContent: 'right',
  backgroundColor: '#E0E5E4'
});

export const PaperStyle = styled(Paper)({
  padding: '2px',
  borderRadius: '20px'
});

export const ContainerGrid = styled(Grid)(({ theme }) => ({
  padding: "0rem 1.5rem 0.5rem 1.5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const ContainerCardContent = styled(CardContent)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  pl: 5,
  WebkitLineClamp: 2,

  [theme.breakpoints.down("sm")]: {
    pl: 0,
  },
}));

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
  textAlignLast: 'left',
  fontSize: '35px',
  color: "#404040",
  fontWeight: 'bold'
});

export const StyledCard = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`;

export const CardMediaStyle= styled(CardMedia)({
  borderRadius: 60,
  width: '200px',
  height: '200px',
  left: '10%',
  position: 'relative',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
});