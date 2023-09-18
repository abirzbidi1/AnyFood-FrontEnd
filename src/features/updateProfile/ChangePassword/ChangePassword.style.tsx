import { Avatar, Button, Dialog, DialogTitle, IconButton, TextField } from '@material-ui/core';
import { Alert } from '@mui/material';
import { styled } from '@mui/system';

export const AlertStyle = styled(Alert)({
    color: 'red',
});

export const DialogStyle = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px",
        }
    }
}));

export const DialogTitleStyle = styled(DialogTitle)({
    background: '#be1622',
    color: '#ffffff',
});

export const IconButtonStyle = styled(IconButton)({
    position: 'absolute',
    right: 8,
    top: 8,
    color: '#ffffff',
});

export const DivStyle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem'
});

export const AvatarStyle = styled(Avatar)({
    width: '100px',
    height: '100px',
    cursor: 'pointer'
});

export const DivButtonsStyle = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly'
});

export const ButtonAddStyle = styled(Button)(({ theme }) => ({
    backgroundColor: '#620D1A',
    color: 'white'
}));

export const InputStyle = styled(TextField)({
    margin: '7px',
    width: '100%'
});

export const SpanStyle = styled('span')({
    color: 'red'
});
