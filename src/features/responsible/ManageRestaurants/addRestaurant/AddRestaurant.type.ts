export interface AddRestaurantProps {
  openDialog: boolean;
  handleClose: () => void;
}
export interface FormRestaurant {
  name: string;
  logo: File;
  address: string;
  description: string;
  phoneNumber: string;
}
