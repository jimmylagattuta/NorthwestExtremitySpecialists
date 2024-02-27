import { Outlet } from 'react-router-dom';
import PagesHeader from '../../components/PagesHeader';
const PhysiciansLayout = () => {
    return (
        <>
            <PagesHeader title='our Physicians' />
            <Outlet />
        </>
    );
};
export default PhysiciansLayout;
