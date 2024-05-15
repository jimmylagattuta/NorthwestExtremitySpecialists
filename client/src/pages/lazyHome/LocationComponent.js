import React, { useState, useEffect } from 'react';
import './helpers/LocationComponent.css';

const LocationComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay of 2 seconds (adjust as needed)
        const delay = 1000;
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, delay);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timeoutId);
    }, []);

    if (isLoading) {
        // Show a loading state while waiting for the delay to complete
        return <div>Loading...</div>;
    }

    return (
        <div className='home-locations'>
            <div className='section-content'>
                <div className='location-icon-container'>
                    <i className='fas fa-map-marked-alt fa-3x'></i>
                </div>
                <h2 className='section-title-location-component'>
                    We Bring Personalized Podiatric & Orthopedic Care
                    Throughout Oregon
                </h2>
            </div>
        </div>
    );
};

export default LocationComponent;
