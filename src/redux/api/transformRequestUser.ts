import { IUser } from "../../types/interfaces/userInterface";

export default function transformRequestUser(user: IUser) {

  return {
    id:user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    phone_number: user.phoneNumber,
    is_responsible: user.isResponsible,
    password: user.password,
    email: user.email,
    image: user.image,
  };

}
