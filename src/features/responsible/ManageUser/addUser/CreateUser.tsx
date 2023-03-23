import { useState } from 'react';
import { AddUserProps } from './AddUser.type';
import { useAddUserMutation } from '../../../../redux/api/userApi';
import { Button, DialogContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import * as MuiIcons from '@material-ui/icons';
import { AvatarStyle, ButtonAddStyle, DialogStyle, DialogTitleStyle, DivButtonsStyle, DivStyle, IconButtonStyle, InputStyle, SpanStyle } from './CreateUser.style';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const supportedFormat = ['image/jpg', 'image/png', 'image/jpeg', 'image/svg', 'image/gif']

const userSchema = yup.object({
  // id: yup.number(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email('Email is invalid'),
  password: yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  image: yup.mixed<File[]>()
    .test('type', "Invalid file format selection ", (value) => value && (value && supportedFormat.includes(value[0].type))),
    //.test('size', 'File size is too big', (value) => !value || value.size <= 1024 * 1024),
  phoneNumber: yup.string().required(),
  isResponsible: yup.number().required().oneOf([0, 1]),
}).required();

type FormData = yup.InferType<typeof userSchema>;

export default function CreateUser({ openDialog, handleClose }: AddUserProps) {
  //set image
  /*const [image, setImage] = useState('');
  function handleChangeImg(e: any) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }*/

  const [createUser, { isLoading, isError, isSuccess }] = useAddUserMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    createUser(data);
  }
if(isSuccess){
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
            <Button variant="contained" type='submit'disabled={isLoading}>
                {isLoading ? 'Adding user...' : 'Add User'}
            </Button>
          </DivButtonsStyle>
        </form>
      </DialogContent>
    </DialogStyle >
  );
}