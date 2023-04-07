import * as yup from "yup";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { US, FR } from 'country-flag-icons/react/3x2';
import { yupResolver } from '@hookform/resolvers/yup';
import LogoToAdd from '../../../assets/images/medium.png';
import { userState } from '../../../redux/slices/userSlice';
import { useLoginUserMutation } from "../../../redux/api/authApi";
import { TextField, Typography, Link } from '@material-ui/core';
import { loginSchema } from '../../../config/constant/schemas/loginSchema';
import { Language, Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { Box, Collapse, IconButton, InputAdornment, MenuItem, SvgIcon } from '@mui/material';
import { AlertStyle, ButtonStyle, DivItemStyle, DivStyle, H2Style, PaperStyle, SelectStyle, SpanStyle } from './Login.style';

type FormData = yup.InferType<typeof loginSchema>;
export default function Login() {
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(loginSchema)
    });
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const onClickLanguageChange = (e: any) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
    }
    const onSubmit = async (info: FormData) => {
        try {
            const result = await loginUser(info).unwrap(); console.log(result);
            localStorage.setItem('accessToken', result.access_token);
            dispatch(userState(result));
            if (result.user.is_responsible === true) {
                navigate('/manage-users');
            }
        }
        catch (error: any) {
            setMessage(error.data.message);
            setOpen(true);
        }
    }
    return (
        <DivStyle>
            <PaperStyle elevation={16}>
                <DivItemStyle >
                    <img src={LogoToAdd} alt='anyFood' />
                </DivItemStyle>
                <DivItemStyle >
                    <H2Style>{t("login.title")}</H2Style>
                </DivItemStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField label='Email*' placeholder='Enter email' variant='outlined' fullWidth {...register("email")} />
                    <SpanStyle>{errors.email?.message}</SpanStyle>  <br /> <br />

                    <TextField label="Password*" placeholder='Enter password' variant='outlined' type={showPassword ? 'text' : 'password'} fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword} edge="end" >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} {...register("password")} />
                    <SpanStyle>{errors.password?.message}</SpanStyle> <br /><br />
                    <Collapse in={open}>
                        <AlertStyle severity="error" action={
                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false); }} >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }>
                            {message}
                        </AlertStyle>
                    </Collapse><br />
                    <ButtonStyle type='submit' variant='contained' fullWidth disabled={isLoading}>
                        {isLoading ? 'Loading...' : t("login.button")}
                    </ButtonStyle>
                </form>
                <Typography>
                    <Link href='/auth/forget-password' style={{ color: '#404040' }} >
                        {t("login.forget_pwd")}
                    </Link>
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
                    <MenuItem value='En'><US style={{ width: 20 }} />&nbsp; english</MenuItem>
                    <MenuItem value='Fr'><FR style={{ width: 20 }} /> &nbsp; french</MenuItem>
                </SelectStyle>
            </PaperStyle>
        </DivStyle>
    );
};