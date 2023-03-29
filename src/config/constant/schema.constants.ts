import * as yup from "yup";
import { GlobalVariables } from "./global.variables";

export const userSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email("Email is invalid"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    image: yup
      .mixed<File[]>()
      .test(
        "type",
        "Invalid file format selection ",
        (value) =>
          value &&
          value &&
          GlobalVariables.File.Image.AcceptType.includes(value[0].type)
      ),
    //.test('size', 'File size is too big', (value) => !value || value.size <= 1024 * 1024),
    phoneNumber: yup.string().required(),
    isResponsible: yup.number().required().oneOf([0, 1]),
  })
  .required();
