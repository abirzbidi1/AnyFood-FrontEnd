export interface IUser {
  id:number,
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  phoneNumber: string;
  isResponsible?: boolean;
}

export interface UserApi {
  id:number,
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  phone_number: string;
  is_responsible?: boolean;
}
