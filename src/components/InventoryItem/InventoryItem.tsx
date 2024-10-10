import './InventoryItem.css';
import useItemStore from '../../store/InventoryStore';
import EditItemButton from '../Inventory/EditItemButton';
import { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { GoNote } from "react-icons/go";
import { GiCrocSword, GiChestArmor, GiPotionBall } from "react-icons/gi";


const InventoryItem = (props: {
    id: number,
    name: string,
    encumbrance: number,
    damage: { value: number, useSB: boolean },
    range: string,
    category: string,
    subCategory: string[],
    availability: string,
    qualities?: string[],
    flaws?: string[],
    locations?: string[],
    armourPoints?: number,
    amount?: number,
    carry?: number,
    description?: string,

}) => {
    const deleteItem = useItemStore((state) => state.deleteItem);
    const updateItemDescription = useItemStore((state) => state.updateItemDescription);

    const [showDescription, setShowDescription] = useState(false);

    //Sets item stats depending on item category.
    const getItemStatsContent = () => {
        switch (props.category) {
            case 'weapon':
                return <div className='item-stats'>
                    <div className='stat'>
                        <div className="label">DAMAGE</div>
                        <span>{props.damage?.useSB ? '+SB+' : ''}</span>
                        <span>{props.damage?.value}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">RANGE</div>
                        <span>{props.range}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">CATEGORY</div>
                        <span>{props.subCategory}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">ENCUMBRANCE</div>
                        <div className='encumbrance spaced'> {props.encumbrance} </div>
                    </div>
                </div>
            case 'armor':
                return <div className='item-stats'>
                    <div className='stat'>
                        <div className='label'>LOCATIONS</div>
                        <span className='locations'>
                            {
                                props.locations?.map((locations: string) => {
                                    return <span>{locations}</span>

                                })
                            }
                        </span>
                    </div>
                    <div className='stat'>
                        <div className='label'>ARMOUR POINTS</div>
                        <span>{props.armourPoints}</span>
                    </div>
                    <div className='stat'>
                        <div className='label'>CATEGORY</div>
                        <span>{props.subCategory}</span>
                    </div>
                    <div className='stat'>
                        <div className='label'>ENCUMBRANCE</div>
                        <span>{props.encumbrance}</span>
                    </div>
                </div>
            case 'items':
                return <div className='item-stats'>
                    <div className="stat">
                        <div className="label">CARRY</div>
                        <span>{props.carry}</span>
                    </div>

                    <div className='stat'>
                        <div className="label">AMOUNT</div>
                        <div>{props.amount}</div>
                    </div>
                    <div className='stat'>
                        <div className="label">CATEGORY</div>
                        <span>{props.subCategory}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">ENCUMBRANCE</div>
                        <div> {props.encumbrance} </div>
                    </div>
                </div>
            default: return <span>test</span>
        }
    }

    //Sets background icon for each category.
    const itemBackgroundIcons: any = {
        'weapon': <GiCrocSword />,
        'armor': <GiChestArmor />,
        'items': <GiPotionBall />,
    }

    return (
        <div className="InventoryItem">
            <div className="background-icon"> {itemBackgroundIcons[props.category]} </div>
            <div className='header'>
                <div className='item-name'>{props.name}</div>

                <div className='item-tools'>
                    <GoNote onClick={() => setShowDescription(!showDescription)} />
                    <EditItemButton id={props.id} />
                    <div className='delete-button'>
                        <FaRegWindowClose onClick={() => deleteItem(props.id)} />
                    </div>
                </div>
            </div>

            <div className='content'>
                {showDescription ?
                    <>
                        <div className='item-description'>
                            <textarea
                                placeholder='Add item description.'
                                value={props.description}
                                spellCheck={false}
                                rows={2}
                                onChange={(e) => updateItemDescription(props.id, e.target.value)}></textarea>
                        </div>
                    </>
                    :
                    <>
                        <div className='traits'>
                            {props.qualities && props.qualities.length > 0 &&
                                <span className='trait-qualities'>
                                    {
                                        props.qualities?.map((quality: string) => {
                                            return <span className='quality'>{quality}</span>
                                        })
                                    }
                                </span>
                            }
                            {props.flaws && props.flaws.length > 0 &&
                                <span className='trait-flaws'>
                                    {
                                        props.flaws && props.flaws?.length > 0 && props.flaws?.map((flaw: string) => {
                                            return <span className='flaw'>{flaw}</span>
                                        })
                                    }
                                </span>
                            }
                        </div>
                        {getItemStatsContent()}
                    </>
                }
            </div>
        </div >
    )
}

export default InventoryItem;