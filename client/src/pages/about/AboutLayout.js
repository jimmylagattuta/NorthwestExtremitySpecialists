import { Outlet, useLocation } from 'react-router-dom';
import PagesHeader from '../../components/PagesHeader';
const Home = () => {
    return (
        <>
            <PagesHeader  style={{ overflowX: 'hidden', maxWidth: '100%' }} title='About Northwest Extremity Specialists' />
            <Outlet  style={{ overflowX: 'hidden', maxWidth: '100%' }} />
        </>
    );
};
export default Home;
