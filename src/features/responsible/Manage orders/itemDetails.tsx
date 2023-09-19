import { useFindItemQuery } from "../../../redux/api/menu/menuApi";

interface ItemDetailProps {
    itemId: number;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ itemId }) => {
    const { data: itemData } = useFindItemQuery(itemId);
    if (!itemData) {
        return null;
    }

    return (
        <div>
            <p>{itemData.name}</p>
        </div>
    );
};

export default ItemDetail;






