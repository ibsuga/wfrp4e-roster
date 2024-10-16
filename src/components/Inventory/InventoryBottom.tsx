import useItemStore from "../../store/InventoryStore";
import PopMenu from '../PopMenu/PopMenu';
import { useMemo } from "react";
import { GiTwoCoins, GiSwapBag } from 'react-icons/gi';
import { FaWeightHanging } from "react-icons/fa";
import { TbInfoHexagon } from "react-icons/tb";




const InventoryBottom = () => {
    const items = useItemStore((state) => state.items);
    const encumbrance = useItemStore((state) => state.encumbrance);
    const updateMaxEncumbrance = useItemStore((state) => state.updateMaxEncumbrance);

    const wealth = useItemStore((state) => state.wealth);
    const updateWealth = useItemStore((state) => state.updateWealth)

    //Encumbrance filters by category
    const weaponEncumbranceFilter = useMemo(() => items.filter((item) => item.category === 'weapon'), [items]);
    const armorEncumbranceFilter = useMemo(() => items.filter((item) => item.category === 'armor'), [items]);
    const consumableEncumbranceFilter = useMemo(() => items.filter((item) => item.category === 'items'), [items]);

    const weaponEncumbrance = useMemo(() => weaponEncumbranceFilter.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items])
    const armorEncumbrance = useMemo(() => armorEncumbranceFilter.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);
    const consumableEncumbrance = useMemo(() => consumableEncumbranceFilter.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);
    const totalEncumbrance = useMemo(() => items.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);


    const EncumbranceInfoTooltipContent =
        <div className="encumbrance-info-tooltip">
            <span className="header">Encumbrance by Category</span>
            <span className="header-background">Encumbrance</span>
            <hr />
            <div>
                <span className="label">Weapons: </span>
                <span className="encumbrance-value">{weaponEncumbrance}</span>
            </div>
            <div>
                <span className="label">Armor: </span>
                <span className="encumbrance-value">{armorEncumbrance}</span>
            </div>
            <div>
                <span className="label">Items: </span>
                <span className="encumbrance-value">{consumableEncumbrance}</span>
            </div>
        </div>


    const EncumbranceRulesTooltipContent =
        <div className="encumbrance-rules-tooltip">
            <div className="header">ENCUMBRANCE RULES</div>
            <span className="header-background">Rules</span>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <th>Encumbrance</th>
                        <th>Penalty</th>
                    </tr>
                    <tr>
                        <td>Up to limit</td>
                        <td>No penalties.</td>
                    </tr>
                    <tr>
                        <td>2x limit</td>
                        <td>-1 Movement (min:3), -10 Agi , +1 Travel Fatigue.</td>
                    </tr>
                    <tr>
                        <td>3x limit</td>
                        <td>-2 Movement (min:2), -20 Agi (min:10), +1 Travel Fatigue.</td>
                    </tr>
                    <tr>
                        <td>More than 3x</td>
                        <td>You're not moving.</td>
                    </tr>
                </tbody>
            </table>
        </div>


    const WealthConversionTooltipContent =
        <div className="conversion-tooltip">
            <div className="header">COIN CONVERSION</div>
            <div className="header-background">Conversion</div>
            <hr />
            <div className="content">
                <span>Standard coin values are:</span>
                <span> <GiTwoCoins className="gold" /> 1 gold crown (1GC) = <GiTwoCoins className="silver" /> 20 silver shillings (20/–) </span>
                <span><GiTwoCoins className="silver" /> 1 silver shilling (1/–) = <GiTwoCoins className="copper" /> 12 brass pennies (12d)</span>

            </div>

        </div>


    return (
        <div className='inventory-bottom'>

            <div className='encumbrance'>
                <PopMenu
                    className="encumbrance-rules-tooltip"
                    label={<FaWeightHanging className="rules-icon" />}
                    content={EncumbranceRulesTooltipContent}
                    positions={['top']}
                    align="end"
                />
                <div className='encumbrance-section'>
                    <span className='label'>Encumbrance</span>
                    <span className={(totalEncumbrance > encumbrance) ? "encumbered" : 'not-encumbered'} >{totalEncumbrance}</span>
                    <span className='label'>Max.</span>
                    <input
                        type="text"
                        maxLength={3}
                        value={encumbrance}
                        onChange={(e) => updateMaxEncumbrance(Number(e.target.value) || 0)}
                    />
                    <PopMenu
                        label={<TbInfoHexagon className="info-button" />}
                        content={EncumbranceInfoTooltipContent}
                        positions={['top']}
                        align="end"
                    />

                </div>
            </div>

            <div className='wealth'>
                <PopMenu
                    className="conversion-tooltip"
                    label={<GiSwapBag className="conversion-icon" />}
                    content={WealthConversionTooltipContent}
                    positions={['top']}
                    align="end"
                />
                <div className="coin-section">
                    <div className="copper">
                        <GiTwoCoins />
                        <input type="text" value={wealth.copper} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'copper')} />
                    </div>
                    <div className="silver">
                        <GiTwoCoins />
                        <input type="text" value={wealth.silver} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'silver')} />
                    </div>
                    <div className="gold">
                        <GiTwoCoins />
                        <input type="text" value={wealth.gold} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'gold')} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InventoryBottom;