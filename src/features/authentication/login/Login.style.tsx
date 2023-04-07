import { Paper } from '@material-ui/core';
import { Alert, Button, Select } from '@mui/material';
import { styled } from '@mui/system';
import BackGround from '../../../assets/images/bgr2.jpg';

export const PaperStyle = styled(Paper)({
  padding: 20,
  maxWidth: 400,
  minHeight: 450,
  borderRadius: 30,
  margin: 'auto',
  width: '90%',
  '@media (max-width: 600px)': {
    width: '100%',
    margin: 0,
    borderRadius: 0,
  },
});

export const ButtonStyle = styled(Button)({
  margin: '8px 0',
  backgroundColor: '#620D1A',
});

export const DivStyle = styled('div')({
  display: 'flex',
  position: 'absolute',
  backgroundImage: `url(${BackGround})`,
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

export const DivItemStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

export const SpanStyle = styled('span')({
  color: 'red',
  fontFamily: 'cursive',
});

export const H2Style = styled('h2')({
  fontFamily: 'cursive',
  fontSize: '2em',
  color: '#595959',
});

export const AlertStyle = styled(Alert)({
  color: 'red',
});

export const SelectStyle = styled(Select)({
  width: 90,
  height: 30,
  marginLeft: '60%',
});