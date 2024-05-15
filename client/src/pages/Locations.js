import React, { useRef, useEffect } from 'react';
import PagesHeader from '../components/PagesHeader';
import { Link } from 'react-router-dom';
import MapContainer from '../components/googleMapReact/MapContainer';
import ChatBox from './../components/helpers/ChatBox';
const Locations = () => {
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (window.location.hash === '#chatbox') {
            setTimeout(() => {
                chatBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        }
    }, []);
    
    return (
        <>
            <PagesHeader title='Locations' />;
            <div className='page-container'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} className='page-info'>
                    <h3 style={{ alignSelf: 'baseline', fontSize: '1rem' }}>
                        Effective November 1, 2023, from 12:00 PM to 1:00 PM, our clinic and call center will be temporarily closed to allow our dedicated staff to take a well-deserved lunch break. Rest assured; we will resume normal operations promptly at 1:00 PM.  Thank you for choosing NES for your healthcare needs. We value your trust and remain committed to delivering exceptional care and service.
                    </h3>
                </div>
            </div>
            <div className='location-map-section'>
                <MapContainer />
            </div>
            <div ref={chatBoxRef} style={{ display: 'flex', justifyContent: 'center', padding: "110px 0px 45px 0px" }}>
                <ChatBox />
            </div>
        </>
    );
};

export default Locations;
