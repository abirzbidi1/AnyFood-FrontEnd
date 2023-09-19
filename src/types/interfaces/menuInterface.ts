export interface IMenu {
    id?: number;
    name: string;
    description: string;
    restaurantId: number;
  }

  export interface IItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: File;
    section_id: number;
  }

  export interface ISection {
    id: number;
    name: string;
    description: string;
    image: File;
    items: IItem;
    menu_id: number;
  }

  export interface IAddSection {
    name: string;
    description: string;
    image: File;
    menuId: number;
  }

  export interface ISupplement {
    id: number;
    name: string;
    price: string;
    image: File;
    section_id: number;
  }

  export interface IAddSupplement {
    name: string;
    price: string;
    image: File;
    sectionId: number;
  }

  export interface IAddItem {

    name: string;
    description: string;
    price: number;
    image: File;
    sectionId: number;
  }

 