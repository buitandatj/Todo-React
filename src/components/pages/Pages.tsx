
import { Link } from 'react-router-dom';
import './pages.scss'
import Header from '../header/Header';
const Pages = () => {
    return (
        <>
            <Header />
            <div className='button-app'>
                <Link to='/App' className='Link'>TODO APP</Link>
            </div>
        </>
    );
};

export default Pages;