import { AddUserProps } from './AddUser.type';
import { useAddUserMutation } from '../../../../redux/api/user/userApi';
import { Button, DialogContent, FormControl, InputLabel, Select, MenuItem, Collapse, Alert, IconButton } from '@mui/material';
import * as MuiIcons from '@material-ui/icons';
import { AvatarStyle, DialogStyle, DialogTitleStyle, DivButtonsStyle, DivStyle, IconButtonStyle, InputStyle, SpanStyle } from './CreateUser.style';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { userSchema } from '../../../../config/constant/schemas/schema.constants';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

type FormData = yup.InferType<typeof userSchema>;

export default function CreateUser({ openDialog, handleClose }: AddUserProps) {
  const access_token = localStorage.getItem("accessToken");
    const [token, setToken] = useState(access_token ? access_token : '');
  const [createUser, { isLoading, isSuccess }] = useAddUserMutation();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(userSchema)
  });
  const [image, setImage] = useState('');
  function handleChangeImg(e: any) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  const onSubmit = async (newUser: FormData) => {
    try {
      const result = await createUser({token,newUser}).unwrap();
    }
    catch (error: any) {
      if (error.data.code === 401) {
        setMessage(t('addUser.exist') as string);
        setOpen(true);
      }
    }
  }
  if (isSuccess) {
   handleClose();
  }
  return (
    <DialogStyle open={openDialog} onClose={handleClose} disableEnforceFocus>
      <DialogTitleStyle >
      <MuiIcons.Add />  {t('addUser.title')}
        <IconButtonStyle aria-label="close" onClick={handleClose}>
          <MuiIcons.Close />
        </IconButtonStyle>
      </DialogTitleStyle>
      <DialogContent>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label >
            <DivStyle>
              <AvatarStyle src={image}>
                <MuiIcons.PhotoCamera style={{ width: '80px', height: '80px' }} />
              </AvatarStyle>
            </DivStyle>
            <input type="file" {...register("image")} onChange={handleChangeImg}/><br />
            <SpanStyle>{errors.image?.message}</SpanStyle> <br />
          </label>
          <InputStyle type="text" label={t('addUser.label_firstname')} variant="outlined" {...register("firstName")} />
           <SpanStyle>{errors.firstName?.message}</SpanStyle><br />

          <InputStyle type="text" label={t('addUser.label_lastname')} variant="outlined" {...register("lastName")} />
          <SpanStyle>{errors.lastName?.message}</SpanStyle><br />

          <InputStyle type="email" label={t('addUser.label_email')} variant="outlined" {...register("email")} />
          <SpanStyle>{errors.email?.message}</SpanStyle>  <br />
          
          <Collapse in={open}>
            <Alert severity="error" action={
              <IconButton aria-label="close" color="inherit" size="small"
                onClick={() => {
                  setOpen(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
              sx={{ color: 'red' }}
            >
              {message}
            </Alert>
            <br />
          </Collapse>
          <InputStyle type="text" label={t('addUser.label_phone')} variant="outlined" {...register("phoneNumber")} />
          <SpanStyle>{errors.phoneNumber?.message}</SpanStyle><br />
          <InputStyle type="password" label={t('addUser.label_password')} variant="outlined" {...register("password")} />
          <SpanStyle>{errors.password?.message}</SpanStyle> <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select fullWidth style={{ margin: "5px" }} label="Role" {...register("isResponsible")} defaultValue='0'>
              <MenuItem value='0'>{t('addUser.user')}</MenuItem>
              <MenuItem value='1'>{t('addUser.responsible')}</MenuItem>
            </Select>
          </FormControl>
          <SpanStyle>{errors.isResponsible?.message}</SpanStyle>
          <DivButtonsStyle>
            <Button variant="contained" color="inherit" onClick={handleClose}>{t('addUser.buttonReset')}</Button>
            <Button variant="contained" type='submit' disabled={isLoading}>
              {isLoading ? t("addUser.loading") : t('addUser.buttonAdd')}
            </Button>
          </DivButtonsStyle>
        </form>
      </DialogContent>
    </DialogStyle >
  );
}