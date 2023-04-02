import { AddUserProps } from './AddUser.type';
import { useAddUserMutation } from '../../../../redux/api/userApi';
import { Button, DialogContent, FormControl, InputLabel, Select, MenuItem, Collapse, Alert, IconButton } from '@mui/material';
import * as MuiIcons from '@material-ui/icons';
import { AvatarStyle, DialogStyle, DialogTitleStyle, DivButtonsStyle, DivStyle, IconButtonStyle, InputStyle, SpanStyle } from './CreateUser.style';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { userSchema } from '../../../../config/constant/schema.constants';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
type FormData = yup.InferType<typeof userSchema>;

export default function CreateUser({ openDialog, handleClose }: AddUserProps) {
  //set image
  /*const [image, setImage] = useState('');
  function handleChangeImg(e: any) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }*/

  const [createUser, { isLoading, isSuccess }] = useAddUserMutation();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit = async (data: FormData) => {
    // console.log(data);
    try {
      const result = await createUser(data).unwrap();
    }
    catch (error: any) {
      if (error.data.code === 401) {
        setMessage('email already exist');
        setOpen(true);
      }
    }
  }
  if (isSuccess) {
    console.log("added");
  }

  return (
    <DialogStyle open={openDialog} onClose={handleClose} disableEnforceFocus>
      <DialogTitleStyle >
        Add new user
        <IconButtonStyle aria-label="close" onClick={handleClose}>
          <MuiIcons.Close />
        </IconButtonStyle>
      </DialogTitleStyle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

          <label >
            <DivStyle>
              <AvatarStyle>
                <MuiIcons.PhotoCamera style={{ width: '80px', height: '80px' }} />
              </AvatarStyle>
            </DivStyle>
            <input type="file" {...register("image")} /><br />
            <SpanStyle>{errors.image?.message}</SpanStyle>
            <br />
          </label>
          <InputStyle
            type="text"
            label="First name"
            variant="outlined"
            {...register("firstName")}
          /> <SpanStyle>{errors.firstName?.message}</SpanStyle><br />
          <InputStyle
            type="text"
            label="Last name"
            variant="outlined"
            {...register("lastName")}
          /><SpanStyle>{errors.lastName?.message}</SpanStyle><br />
          <InputStyle
            type="email"
            label="Email"
            variant="outlined"
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
                > <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ color: 'red' }}
            >
              {message}
            </Alert>
            <br />
          </Collapse>
          <InputStyle
            type="text"
            label="Phone number"
            variant="outlined"
            {...register("phoneNumber")}
          /><SpanStyle>{errors.phoneNumber?.message}</SpanStyle><br />
          <InputStyle
            type="password"
            label="Password"
            variant="outlined"
            {...register("password")}
          /><SpanStyle>{errors.password?.message}</SpanStyle>
          <br />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              fullWidth
              style={{ margin: "5px" }}
              label="Role"
              {...register("isResponsible")}>
              <MenuItem value='0'>User</MenuItem>
              <MenuItem value='1'>Responsible</MenuItem>
            </Select>
          </FormControl>
          <SpanStyle>{errors.isResponsible?.message}</SpanStyle>
          <DivButtonsStyle>
            <Button variant="contained" color="inherit" onClick={handleClose}>Reset</Button>
            <Button variant="contained" type='submit' disabled={isLoading}>
              {isLoading ? 'Adding user...' : 'Add User'}
            </Button>
          </DivButtonsStyle>
        </form>
      </DialogContent>
    </DialogStyle >
  );
}