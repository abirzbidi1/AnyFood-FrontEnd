import { FormRestaurant } from "../../../features/responsible/ManageRestaurants/addRestaurant/AddRestaurant.type";
import { IRestaurant } from "../../../types/interfaces/restoInterface";

export function transformRequestResto(restaurant: IRestaurant) {
  return {
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    description: restaurant.description,
    phone_number: restaurant.phoneNumber,
    logo: restaurant.logo,
  };
}

export const transformBodyToFormData = (body: FormRestaurant) => {
  const formData = new FormData();

  formData.append("id", body.id);
  formData.append("name", body.name);
  formData.append("address", body.address);
  formData.append("phone_number", body.phoneNumber);
  formData.append("description", body.description);
  formData.append("logo", body.logo);
  return formData;
};
