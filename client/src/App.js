import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/about/About';
import Error from './pages/Error';
import SingleAbout from './pages/about/SingleAbout';
import AboutLayout from './pages/about/AboutLayout';
import PhysiciansLayout from './pages/physicians/PhysiciansLayout';
import SinglePhysician from './pages/physicians/SinglePhysician';
import Physicians from './pages/physicians/Physicians';
import Services from './pages/services/Services';
import ServicesLayout from './pages/services/ServicesLayout';
import SingleService from './pages/services/SingleService';

const validPhysicianIds = [
    "Michael J. Hejna",
    "Scott A. Seymour",
    "Erling Ho",
    "Nicolas S. Anderson"
];

function App() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, [pathname]);

    const isValidPhysicianId = (physicianId) => {
        console.log('physicianId', physicianId);
        return validPhysicianIds.includes(physicianId);
    };

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about-us/*" element={<AboutLayout />}>
                    <Route index element={<About />} />
                    <Route path=":aboutId" element={<SingleAbout />} />
                </Route>



                {/* Physician not there */}
                <Route path="physicians" element={<PhysiciansLayout />}>
                    <Route index element={<Physicians />} />

                    <Route path=":physicianId" element={<SinglePhysician />} match={isValidPhysicianId} />
                    <Route path="*" element={<Navigate to="/physicians" replace />} />
                </Route>



                {/* Physician there */}
                {/* <Route path="physicians/*" element={<PhysiciansLayout />}>
                    <Route index element={<Physicians />} />
                    <Route path='*' element={<Navigate to="/physicians" replace />} />

                </Route> */}




                <Route path="services/*" element={<ServicesLayout />}>
                    <Route index element={<Services />} />
                    <Route path=":serviceId" element={<SingleService />} />
                </Route>
                <Route path="locations" element={<Locations />} />
                <Route path="about" element={<AboutLayout />} />
                <Route path="providers/*" element={<Navigate to="/physicians" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
