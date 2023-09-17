import { Grid, TextField, Typography } from '@material-ui/core';
import { useForgetPasswordMutation } from '../../../redux/api/authentication/authApi';
import LogoToAdd from '../../../assets/images/small.png';
import { ButtonStyle, DivItemStyle, DivStyle, LinkStyle, PaperStyle } from '../resetPassword/ResetPassword.style';
import { H2Style, SpanStyle } from '../login/Login.style';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Alert, Box, Collapse, IconButton, MenuItem, SvgIcon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckEmail from '../../../components/checkEmail';
import { SelectStyle } from "../login/Login.style";
import { Language } from "@material-ui/icons";
import { FR, US } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

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
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const onClickLanguageChange = (e: any) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
    }
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
                                {t("forgetPassword.title")}
                            </H2Style>
                        </DivItemStyle>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="Email*"
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
                                {isLoading ? 'Loading...' : t("forgetPassword.text_button")}
                            </ButtonStyle>
                        </form>
                        <Typography>
                            <LinkStyle href="/auth/login" >
                            {t("forgetPassword.back_sign_in")}
                            </LinkStyle>
                        </Typography>
                        <br />
                <SelectStyle defaultValue="" displayEmpty onChange={onClickLanguageChange}
                    renderValue={(value) => {
                        return (
                            <Box>
                                <>
                                    <SvgIcon >
                                        <Language />
                                    </SvgIcon>
                                    {value}
                                </>
                            </Box>
                        );
                    }}>
                    <MenuItem value='en'><US style={{ width: 20 }} />&nbsp; English</MenuItem>
                    <MenuItem value='fr'><FR style={{ width: 20 }} /> &nbsp; French</MenuItem>
                </SelectStyle>
                    </Grid>
                </PaperStyle>
            </Grid>
        </DivStyle>
    );
};