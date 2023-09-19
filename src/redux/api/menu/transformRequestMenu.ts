import { IAddItem, IAddSection, IAddSupplement, IMenu } from "../../../types/interfaces/menuInterface";

export const transformMenuDataToFormData = (body: IMenu) => {
    const formData = new FormData();
  
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("restaurant_id", body.restaurantId);
    return formData;
  };

  export const transformSectionDataToFormData = (body: IAddSection) => {
    const formData = new FormData();
  
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("menu_id", body.menuId);
    formData.append("image",body.image);
    return formData;
  };

  export const transformItemDataToFormData = (body: IAddItem) => {
    const formData = new FormData();
  
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("price",body.price);
    formData.append("image",body.image);
    formData.append("section_id", body.sectionId);
    return formData;
  };

  export const transformSupplementDataToFormData = (body: IAddSupplement) => {
    const formData = new FormData();
  
    formData.append("name", body.name);
    formData.append("price", body.price);
    formData.append("image",body.image);
    formData.append("section_id", body.sectionId);
    return formData;
  };