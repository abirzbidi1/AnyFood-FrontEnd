import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Grid } from '@material-ui/core';
import { useResetPasswordMutation } from '../../../redux/api/authApi';
import LogoToAdd from '../../../assets/images/small.png';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonStyle, DivItemStyle, DivStyle, H2Style, PaperStyle, SpanStyle } from "./ResetPassword.style";
import { useNavigate } from "react-router-dom";
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { validationSchema } from "../../../config/constant/schemas/resetPassword";

type FormData = Yup.InferType<typeof validationSchema>;

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const token = params.get("token");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: FormData) => {
    const param = { 'password': data.password, 'password_confirmation': data.passwordConfirmation, 'email': email, 'token': token }
    try {
      const result = await resetPassword(param).unwrap();
      navigate('/auth/login');
    } catch (error: any) {
      setMessage(error.data.message);
      setOpen(true);
    }
  }
  return (
    <DivStyle>
      <Grid container direction="column" alignItems="center" >
        <PaperStyle elevation={16}>
          <Grid item>
            <DivItemStyle>
              <img src={LogoToAdd} alt="anyFood" />
            </DivItemStyle>
            <DivItemStyle>
              <H2Style>
                Reset password
              </H2Style>
            </DivItemStyle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField label="Password" type="password" fullWidth {...register("password")}/>
              <SpanStyle>{errors.password?.message}</SpanStyle>

              <TextField label="Confirm Password" type="password" margin="normal" fullWidth {...register("passwordConfirmation")} />
              <SpanStyle>{errors.passwordConfirmation?.message}</SpanStyle>
              <Collapse in={open}>
                        <Alert severity="error"  sx={{ color: 'red' }}
                            action={
                                <IconButton aria-label="close" color="inherit" size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }} >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }>
                            {message}
                        </Alert>
                    </Collapse>
              <ButtonStyle type="submit" variant="contained" fullWidth disabled={isLoading}>
                {isLoading ? 'Loading...' : ' Confirm password'}
              </ButtonStyle>
            </form>
          </Grid>
        </PaperStyle>
      </Grid>
    </DivStyle>
  );
};