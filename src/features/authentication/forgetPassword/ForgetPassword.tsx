import { Grid, TextField, Typography } from '@material-ui/core';
import { useForgetPasswordMutation } from '../../../redux/api/authApi';
import LogoToAdd from '../../../assets/images/small.png';
import { ButtonStyle, DivItemStyle, DivStyle, LinkStyle, PaperStyle } from '../resetPassword/ResetPassword.style';
import { H2Style, SpanStyle } from '../login/Login.style';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckEmail from '../../../components/checkEmail';


const ForgetPasswordSchema = yup.object({
    email: yup.string()
        .required()
        .email('Email Address is invalid*'),
});

type FormData = yup.InferType<typeof ForgetPasswordSchema>;

export default function ForgetPassword() {
    const [forgetPassword, { isLoading, isSuccess }] = useForgetPasswordMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(ForgetPasswordSchema)
    });
    //show error
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const onSubmit = async (data: FormData) => {
        try {
            const result = await forgetPassword(data).unwrap();
        }
        catch (error: any) {
            setMessage(error.data.message);
            setOpen(true);
        }
    }
    if (isSuccess) {
        return <CheckEmail />;
    }
    return (
        <DivStyle>
            <Grid
                container
                direction="column"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <PaperStyle elevation={16}>
                    <Grid item>
                        <DivItemStyle>
                            <img src={LogoToAdd} alt="anyFood" />
                        </DivItemStyle>
                        <DivItemStyle>
                            <H2Style>
                                Forget password
                            </H2Style>
                        </DivItemStyle>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="Email*"
                                placeholder="Enter email"
                                variant="outlined"
                                fullWidth
                                {...register("email")}
                            /><SpanStyle>{errors.email?.message}</SpanStyle>  <br />
                            <Collapse in={open}>
                                <Alert severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ color: 'red' }}
                                >
                                    {message}
                                </Alert>
                            </Collapse>
                            <ButtonStyle
                                type="submit"
                                variant="contained"
                                fullWidth disabled={isLoading}>
                                {isLoading ? 'Loading...' : ' Forget password'}
                            </ButtonStyle>
                        </form>
                        <Typography>
                            <LinkStyle href="/auth/login" >
                                Back to Sign In
                            </LinkStyle>
                        </Typography>
                    </Grid>
                </PaperStyle>
            </Grid>
        </DivStyle>
    );
};