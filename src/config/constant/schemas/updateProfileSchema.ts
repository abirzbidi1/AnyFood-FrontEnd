import * as yup from "yup";
import { GlobalVariables } from "../global.variables";

export const UpdateProfileSchema = yup.object({
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
  firstName: yup.string().required("first name is Required!"),
  lastName: yup.string().required("last name is Required!"),
  phoneNumber: yup
    .string()
    .required("phone number is Required and must Contain 8 numbers!"),
});
