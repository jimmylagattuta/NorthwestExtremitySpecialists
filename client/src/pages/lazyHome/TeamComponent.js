import React, { useState, useEffect } from 'react';
import './helpers/TeamComponent.css';

const TeamComponent = () => {
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
        <div className='home-team'>

                <div className="team-inner-div">
                    <div className="team-second-inner-div">
                        <h2 className='follow-us-title'>
                            Follow Us
                        </h2>
                        <div className='team-icon-container'>
                            <a style={{ color: 'white', zIndex: '10' }} href='https://www.facebook.com/NorthwestExtremitySpecialists' target='_blank' rel='noopener noreferrer' title="Facebook Review">
                                <i className='fab fa-facebook fa-2x'></i>
                            </a>
                        </div>
                    </div>
                    <div className="team-second-inner-div">
                        <h2 className='follow-us-title'>
                            Meet Our Team
                        </h2>
                        <div className='team-icon-container'>
                            <a
                                className='team-print-staff'
                                href="/providers"
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                            >
                                Friendly Staff Overview
                            </a>
                        </div>
                    </div>
                </div>

        </div>
    );
};

export default TeamComponent;
