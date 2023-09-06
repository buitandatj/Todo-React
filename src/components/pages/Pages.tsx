
import { Link } from 'react-router-dom';
import './pages.scss'
import Header from '../header/Header';
const Pages = () => {
    return (
        <div className='pages'>
            <Header />
            <div className='button-app'>
                <Link to='/App' className='Link'>TODO APP</Link>

            </div>
            <div className='menus-page'>
                <Link to='/blog' className='menu-child'>BLOG</Link>
                <Link to='/info' className='menu-child'>INFO</Link>
            </div>
        </div>
    );
};

export default Pages;