import InventoryItem from '../InventoryItem/InventoryItem';
import useItemStore, { itemType } from '../../store/InventoryStore';
import CreateItemDialog from './components/CreateItemDialog';
import { useMemo, useState } from "react";
import { GiChestArmor, GiCrocSword, GiPotionBall, GiHandBag, GiSwordsEmblem } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { IoListSharp } from "react-icons/io5";
import { Dialog } from 'primereact/dialog';
import { ColorPicker } from 'primereact/colorpicker';


export const InventoryItems = () => {
  //Filter states.
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [containerFilter, setContainerFilter] = useState<number | null>(null);
  const [equippedFilter, setEquippedFilter] = useState(false);
  const [searchText, setSearchText] = useState('');
  //Sort state
  const [sortMode, setSortMode] = useState<string | null>('new');
  //Container states.
  const [containerLabel, setContainerLabel] = useState('');
  const [containerColor, setContainerColor] = useState('');

  const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false);

  const [items, equippedItems, containers, addContainer, deleteContainer] = useItemStore((state) => [
    state.items,
    state.equippedItems,
    state.containers,
    state.addContainer,
    state.deleteContainer
  ]);

  const selectedContainer: any = containers.find(container => container.id === containerFilter);

  const equipped_items = items.filter((item: itemType) => equippedItems.includes(item.id))


  // Filter Items by category or containers.
  let filtered_items;

  if (categoryFilter !== null) {
    filtered_items = items.filter((item: itemType) => item.category === categoryFilter);
  } else if (containerFilter !== null) {
    filtered_items = items.filter((item: itemType) => item.container_id == containerFilter);
  } else if (equippedFilter) {
    filtered_items = equipped_items;
  } else {
    filtered_items = [...items];
  }

  // Further filter items by SearchBar string.
  const handleChangeSearchtext = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  if (searchText) {
    filtered_items = filtered_items.filter((item: itemType) => {
      const item_name = item.name.toLowerCase();
      const search_string = searchText.toLowerCase();
      return item_name.includes(search_string);
    });
  }

  let sorted_items;

  switch (sortMode) {
    case 'a-z':
      sorted_items = filtered_items.sort((a, b) => a.name < b.name ? -1 : 1);
      break;
    case 'z-a':
      sorted_items = filtered_items.sort((a, b) => a.name > b.name ? -1 : 1);
      break;
    case 'new':
      sorted_items = filtered_items.sort((a, b) => b.id - a.id);
      break;
    case 'old':
      sorted_items = filtered_items.sort((a, b) => a.id - b.id);
      break;
    default:
      sorted_items = filtered_items;
      break;
  }

  //Create Container Dialog.
  const handleClose = () => {
    setInventoryDialogOpen(false);
    setContainerLabel('');
    setContainerColor('');
  };

  //Container functions.
  const handleCreateContainer = () => {
    if (containerLabel !== '') {
      addContainer(containerLabel, containerColor);
      handleClose();
    }
  };

  const handleDeleteContainer = () => {
    if (selectedContainer) {
      deleteContainer(selectedContainer.id);
      setCategoryFilter(null);
      setContainerFilter(null);
    }
  };

  const handleFilterSelect = (category?: string, container?: number, equipped?: boolean) => {
    if (category) {
      setCategoryFilter(category);
      setContainerFilter(null);
      setEquippedFilter(false)
    } else if (container) {
      setCategoryFilter(null);
      setContainerFilter(container);
      setEquippedFilter(false)
    } else if (equipped) {
      setEquippedFilter(true);
      setCategoryFilter(null);
      setContainerFilter(null)
    } else {
      setCategoryFilter(null);
      setContainerFilter(null);
      setEquippedFilter(false)
    }
  };

  const activeFilterLabel = useMemo(() => {
    if (categoryFilter !== null) {
      return categoryFilter;
    } else if (containerFilter !== null) {
      return selectedContainer?.label;
    } else if (equippedFilter) {
      return 'Equipped Items'
    } else {
      return 'All Items';
    }
  }, [categoryFilter, containerFilter, equippedFilter]);


  const activeFilterIcon = useMemo(() => {
    if (categoryFilter !== null) {
      switch (categoryFilter) {
        case 'weapon': return <GiCrocSword />;
        case 'armor': return <GiChestArmor />;
        case 'items': return <GiPotionBall />;
      }
    } else if (containerFilter !== null) {
      return <GiHandBag style={{ color: `#${selectedContainer?.color}` }} />
    } else if (equippedFilter) {
      return <GiSwordsEmblem />;
    } else {
      return <IoListSharp />
    }
  }, [categoryFilter, containerFilter, equippedFilter]);


  return (
    <>
      <div className='filter-bar'>
        <span>  <MdClear onClick={() => handleFilterSelect()} /> </span>

        <span className='spacer'> <LuDot /> </span>

        <span> <GiCrocSword onClick={() => handleFilterSelect('weapon', undefined, false)} /> </span>
        <span> <GiChestArmor onClick={() => handleFilterSelect('armor', undefined, false)} /> </span>
        <span> <GiPotionBall onClick={() => handleFilterSelect('items', undefined, false)} /> </span>
        <span> <GiSwordsEmblem onClick={() => handleFilterSelect(undefined, undefined, true)} /> </span>

        <span className='spacer'> <LuDot /> </span>

        <div className='containers'>
          {
            containers.map((container, index) =>
              <GiHandBag
                key={index}
                onClick={() => handleFilterSelect(undefined, container.id)}
                style={{ color: `#${container.color}` }}
              />
            )
          }
          <div className='add-container-button' onClick={() => setInventoryDialogOpen(true)}> + </div>
        </div>

        <Dialog
          className={'inventoryDialog'}
          visible={inventoryDialogOpen}
          onHide={handleClose}
          footer={
            <div className="dialog-footer">
              <button className='footer-button' onClick={handleCreateContainer} disabled={!containerLabel}> Save </button>
              <button className='footer-button' onClick={handleClose}> Close </button>
            </div>
          }
          closable={false}
          draggable={false}
          resizable={false}
        >
          <div className='container-dialog'>
            <div>
              <GiHandBag />
              <input type="text" placeholder='Container Name' value={containerLabel} onChange={(e) => setContainerLabel(e.target.value)} />
            </div>
            <div className='color-selector'>
              <span>Container color</span>
              <ColorPicker format='hex' value={containerColor} onChange={(e: any) => setContainerColor(e.value)} />
            </div>
          </div>
        </Dialog>
      </div>

      <div className="tools-bar">

        <div className="tools-bar-top">
          <div className='active-filter'> {activeFilterIcon} {activeFilterLabel}</div>
          <div className='inventory-search-bar'>
            <FaSearch />
            <input onChange={handleChangeSearchtext} value={searchText} type="text" placeholder='Find items...' />
          </div>
        </div>

        <div className="tools-bar-bottom">
          <button
            onClick={() => setSortMode(sortMode === 'a-z' ? 'z-a' : 'a-z')}
            className={`toolbar-button ${(sortMode === 'a-z' || sortMode === 'z-a') ? 'active' : ''}`}
          >
            {sortMode === 'z-a' ? 'Z-A' : 'A-Z'}
          </button>
          <button
            onClick={() => setSortMode(sortMode === 'new' ? 'old' : 'new')}
            className={`toolbar-button ${(sortMode === 'new' || sortMode === 'old') ? 'active' : ''} `}
          >
            {sortMode === 'old' ? 'OLD' : 'NEW'}
          </button>

          <button
            className='toolbar-button'
            onClick={handleDeleteContainer}
            disabled={!containerFilter}
          >
            DELETE CONTAINER
          </button>

          <CreateItemDialog />
        </div>
      </div>

      <div className='items'>
        <div>
          {
            sorted_items.map((item: itemType, index: number) => <InventoryItem key={index} data={item} />)
          }
        </div>
      </div>
    </>
  );
};

export default InventoryItems;


