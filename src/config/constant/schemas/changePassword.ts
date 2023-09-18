import * as yup from "yup";

export const ChangePasswordSchema = yup.object({
    currentPassword: yup.string().required(),
    password:yup.string().required().min(8),
});