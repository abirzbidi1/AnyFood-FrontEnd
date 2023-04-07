import { Paper, Link } from '@material-ui/core';
import { styled } from '@mui/system';

export const PaperStyle = styled(Paper)({
    padding: 20,
    width: '90%',
    maxWidth: 400,
    margin: '5% auto',
    borderRadius: 30
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

export const ImgStyle = styled('img')({
    width: '100px',
    height: '100px'
});

export const H3Style = styled('h3')({
    fontFamily: 'cursive',
    fontSize: '24px',
    color: '#595959'
});