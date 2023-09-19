import { IItem } from "../../../../../types/interfaces/menuInterface";

export interface OrderProps {
    id: number;
    open: boolean;
    item?: IItem;
    onClose: () => void;
}