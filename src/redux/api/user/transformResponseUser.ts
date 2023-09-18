import { IUser, UserApi } from "../../../types/interfaces/userInterface";

export default function transformResponseUser(users: UserApi[]): IUser[] {
  const result: IUser[] = [];

  users.map((user: UserApi) => {
    result.push({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone_number,
      isResponsible: user.is_responsible,
      email: user.email,
      image: user.image,
    } as IUser);
  });
  return result;
}
