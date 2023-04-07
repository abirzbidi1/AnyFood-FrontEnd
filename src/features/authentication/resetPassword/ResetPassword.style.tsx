import { Paper,Link } from '@material-ui/core';
import { Button} from '@mui/material';
import { styled } from '@mui/system';

export const PaperStyle = styled(Paper)({
    padding: 20,
    width: '90%',
    maxWidth: 400,
    margin: '5% auto',
    borderRadius: 30
});

export const ButtonStyle = styled(Button)({
    margin: '8px 0',
    backgroundColor: '#620D1A',
});

export const DivStyle = styled('div')({
    position: 'absolute',
    backgroundColor: '#CACACA',
    width: '100%',
    height: '100%',
});

export const DivItemStyle = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

export const SpanStyle = styled('span')({
   color:'red',
   fontFamily:'cursive'
});

export const LinkStyle = styled(Link)({
    color: '#404040'
 });

 export const H2Style = styled('h2')({
    fontFamily: 'cursive',
    fontSize: '2em',
    color: '#595959',
 });