import { IUpdateUser, IUser } from "../../../types/interfaces/userInterface";

export function transformRequestUser(user: IUser) {
  const formData = new FormData();

  formData.append("id", user.id);
  formData.append("first_name", user.firstName);
  formData.append("last_name", user.lastName);
  formData.append("phone_number", user.phoneNumber);
  formData.append("is_responsible", user.isResponsible ? '1' : '0');
  formData.append("password", user.password);
  formData.append("email", user.email);
  formData.append("image", user.image[0]);
  return formData;
}

export function transformRequestUpdateUser(user: IUpdateUser) {
  const formData = new FormData();

  formData.append("first_name", user.firstName);
  formData.append("last_name", user.lastName);
  formData.append("phone_number", user.phoneNumber);
  formData.append("image", user.image[0]);
  return formData;
}
