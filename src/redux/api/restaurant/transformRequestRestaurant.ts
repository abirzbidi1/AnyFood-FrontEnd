import { IRestaurant, RestaurantApi } from "../../../types/interfaces/restoInterface";

export default function transformResponseRestaurant(restaurant: RestaurantApi):IRestaurant {
    return {
        id: restaurant.id,
        name: restaurant.name,
        address:restaurant.address,
        description:restaurant.description,
        phoneNumber: restaurant.phone_number,
        logo: restaurant.logo,
      } as IRestaurant;
  }