export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: File[] ;
  phoneNumber: string;
  isResponsible?: boolean;
}

export interface UserApi {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image:  File[];
  phone_number: string;
  is_responsible?: boolean;
}
