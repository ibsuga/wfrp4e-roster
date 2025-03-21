import { GiPotionBall } from 'react-icons/gi';
import './ItemSlot.css'
import useItemStore from '../../store/InventoryStore';


const ItemSlot = (props: {
    id?: number,
    label: string,
    image: string,
    amount?: number,
}) => {

    const updateItemAmount = useItemStore((state) => state.updateItemAmount);

    return (
        <div className="ItemSlot">
            <input
                type="text"
                maxLength={2}
                value={props.amount}
                onChange={(e: any) => props.id && updateItemAmount(props.id, e.target.value)}
            />
            <div className='item-slot-image'>
                <GiPotionBall />
            </div>
            <div className='item-slot-label'>{props.label}</div>
        </div>
    )
}

export default ItemSlot;