import { Button, DialogContent } from "@mui/material";
import * as MuiIcons from '@material-ui/icons';
import { AvatarStyle, DialogStyle, DialogTitleStyle, DivButtonsStyle, DivStyle, IconButtonStyle, InputStyle, SpanStyle } from "./UpdateProfile.style";
import { useUpdateUserMutation } from "../../redux/api/user/userApi";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UpdateProfileSchema } from "../../config/constant/schemas/updateProfileSchema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DialogProps } from "../../config/constant/DialogProps";
import { useTranslation } from "react-i18next";

type FormData = yup.InferType<typeof UpdateProfileSchema>;
export default function UpdateProfile({ openDialog, handleClose }: DialogProps) {
    const [UpdateProfile, { isLoading }] = useUpdateUserMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(UpdateProfileSchema)
    });
    const user = localStorage.getItem('user');
    const info = JSON.parse(user ? user : '');
    const [idUser] = useState(info?.id);
    const { t } = useTranslation();
    const [image, setImage] = useState('');
    function handleChangeImg(e: any) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    const onSubmit = async (userInfo: FormData) => {
        try {
            const result = await UpdateProfile({ idUser, userInfo }).unwrap();
        }
        catch (error: any) {
           
        }
    }
   
    return (
        <DialogStyle open={openDialog} onClose={handleClose} disableEnforceFocus>
            <DialogTitleStyle >
                <MuiIcons.Edit />  {t("editProfile.title")}
                <IconButtonStyle aria-label="close" onClick={handleClose}>
                    <MuiIcons.Close />
                </IconButtonStyle>
            </DialogTitleStyle>
            <DialogContent>

                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <label >
                        <DivStyle>
                        <AvatarStyle src={image}>
                <MuiIcons.PhotoCamera style={{ width: '80px', height: '80px' }} />
              </AvatarStyle>
            </DivStyle>
            <input type="file" {...register("image")} onChange={handleChangeImg}/><br />
                        <SpanStyle>{errors.image?.message}</SpanStyle> <br />

                    </label>
                    <InputStyle type="text" label={t("editProfile.label_firstname")} variant="outlined" {...register("firstName")} defaultValue={info?.firstName} />
                    <SpanStyle>{errors.firstName?.message}</SpanStyle><br />
                    <InputStyle type="text" label={t("editProfile.label_lastname")} variant="outlined" {...register("lastName")} defaultValue={info?.lastName}/>
                    <SpanStyle>{errors.lastName?.message}</SpanStyle><br />
                    <InputStyle type="email" label={t("editProfile.label_email")} variant="outlined" defaultValue={info?.email}/>
                    <InputStyle type="text" label={t("editProfile.label_phone")} variant="outlined" {...register("phoneNumber")} defaultValue={info?.phoneNumber}/>
                    <SpanStyle>{errors.phoneNumber?.message}</SpanStyle><br />
                    <DivButtonsStyle>
                        <Button variant="contained" color="inherit" onClick={handleClose}>{t("editProfile.buttonReset")}</Button>
                        <Button variant="contained" type='submit' color="success" disabled={isLoading}>
                            {isLoading ? t("editProfile.loading") : t("editProfile.buttonEdit")}
                        </Button>
                    </DivButtonsStyle>
                </form>
            </DialogContent>
        </DialogStyle >
    );
}