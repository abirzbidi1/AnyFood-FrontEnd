import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().required().email('Email Address is invalid'),
    password: yup.string().required().min(8),
});