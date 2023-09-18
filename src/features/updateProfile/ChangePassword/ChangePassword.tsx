import { Button, DialogContent, Collapse, IconButton } from "@mui/material";
import { changePasswordProps } from "./ChangePasswordProps.type";
import * as MuiIcons from '@material-ui/icons';
import { DialogStyle, DialogTitleStyle, DivButtonsStyle, IconButtonStyle, InputStyle, SpanStyle, AlertStyle } from "./ChangePassword.style";
import { useChangePasswordMutation } from "../../../redux/api/user/userApi";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ChangePasswordSchema } from "../../../config/constant/schemas/changePassword";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

type FormData = yup.InferType<typeof ChangePasswordSchema>;
export default function ChangePassword({ openDialogPassword, handleClosePassword }: changePasswordProps) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [ChangePassword, { isLoading, isError, isSuccess }] = useChangePasswordMutation();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(ChangePasswordSchema)
    });
    const user = localStorage.getItem('user');
    const info = JSON.parse(user ? user : '');
    const [idUser] = useState(info?.id);
    const onSubmit = async (userInfo: FormData) => {
        try {
            const result = await ChangePassword({ idUser, userInfo }).unwrap();
        }
        catch (error: any) {
            setMessage(error.data.message);
            setOpen(true);
        }
    }
    if (isSuccess) {
        navigate('/profile');
    }
    return (
        <DialogStyle open={openDialogPassword} onClose={handleClosePassword} disableEnforceFocus>
            <DialogTitleStyle >
                <MuiIcons.Lock />  {t("changePassword.title")}
                <IconButtonStyle aria-label="close" onClick={handleClosePassword}>
                    <MuiIcons.Close />
                </IconButtonStyle>
            </DialogTitleStyle>
            <DialogContent>

                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"><br/>
                    <InputStyle type="text" label={t("changePassword.label_password")} variant="outlined" {...register("currentPassword")} />
                    <SpanStyle>{errors.currentPassword?.message}</SpanStyle>
                    <Collapse in={open}>
                        <AlertStyle severity="error" action={
                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false); }} >
                                <MuiIcons.Close fontSize="inherit" />
                            </IconButton>
                        }>
                            {message}
                        </AlertStyle>
                    </Collapse>
                    <InputStyle type="password" label={t("changePassword.label_new_password")} variant="outlined" {...register("password")} />
                    <SpanStyle>{errors.password?.message}</SpanStyle><br />
                    <DivButtonsStyle>
                        <Button variant="contained" color="inherit" onClick={handleClosePassword}>{t("changePassword.buttonReset")}</Button>
                        <Button variant="contained" type='submit' color="success" disabled={isLoading}>
                            {isLoading ? t("changePassword.loading") : t("changePassword.buttonChange")}
                        </Button>
                    </DivButtonsStyle>
                </form>
            </DialogContent>
        </DialogStyle >
    );
}