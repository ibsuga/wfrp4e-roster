import CharacterSlots from '../../components/CharacterSlots/CharacterSlots';
import Inventory from '../../components/Inventory/Inventory';
import Navbar from '../../components/Navbar/Navbar';
import Stats from '../../components/Stats/Stats';
import './Home.css'


const Home = () => {
    return (
        <div className="Home">
            <Navbar />
            <div className='content'>
                <div className='equipment-section'>
                    <Inventory />
                </div>
                <div className='character-section'>
                    <CharacterSlots />
                </div>
                <div className='status-section'>
                    <Stats />
                </div>
            </div>
        </div>
    )
}

export default Home;