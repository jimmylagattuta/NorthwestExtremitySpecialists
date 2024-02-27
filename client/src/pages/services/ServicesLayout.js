import { Outlet } from 'react-router-dom';
import PagesHeader from '../../components/PagesHeader';
const ServicesLayout = () => {
    return (
        <>
            <PagesHeader title='Services' />
            <Outlet />
        </>
    );
};
export default ServicesLayout;
