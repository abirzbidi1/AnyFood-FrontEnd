export interface IRestaurant {
    id?: number;
    name: string;
    address: string;
    description: string;
    phoneNumber: string;
    rating:number;
    logo: File[] ;
    
  }
  
  export interface IRestaurantTest {
    name: string;
    address: string;
    description: string;
    phoneNumber: string;
    logo: File[] ;
    
  }

  export interface RestaurantApi {
    id: number;
    name: string;
    address: string;
    description: string;
    phone_number: string;
    logo:  File[];
  }

  export interface ShowRestaurantsApi {
    id : number;
    name :string ;
  }