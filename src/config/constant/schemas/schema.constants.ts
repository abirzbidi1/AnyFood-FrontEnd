import * as yup from "yup";
import { GlobalVariables } from "../global.variables";

export const userSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email("Email is invalid"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(
        /[A-Za-zd@$!%*#?&]/,
        "Must Contain :One Uppercase, One Lowercase and one special case Character"
      ),
    image: yup
      .mixed<File[]>()
      .required()
      .test(
        "type",
        "Invalid image  format",
        (value) =>
          value &&
          value &&
          GlobalVariables.File.Image.AcceptType.includes(value[0].type)
      ),
    phoneNumber: yup.string().required(),
    isResponsible: yup.number().required().oneOf([0, 1]),
  })
  .required();
