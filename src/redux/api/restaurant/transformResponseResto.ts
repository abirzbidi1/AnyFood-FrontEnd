import { IRestaurant, RestaurantApi } from "../../../types/interfaces/restoInterface";

export default function transformResponseResto(restaurants: RestaurantApi[]):IRestaurant[] {
    const result: IRestaurant[]=[];
  
    restaurants.map((restaurant: RestaurantApi) => {
      result.push({
        id: restaurant.id,
        name: restaurant.name,
        address:restaurant.address,
        description:restaurant.description,
        phoneNumber: restaurant.phone_number,
        logo: restaurant.logo,
      } as IRestaurant);
    });
  
    return result;
  }

  