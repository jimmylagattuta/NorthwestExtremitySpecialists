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
                            <a aria-label="Link to go to Company Default's Facebook page." style={{ color: 'white' }} href='https://www.facebook.com/defaultcompany042024' target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-facebook fa-3x'></i>
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
                                href={process.env.PUBLIC_URL + '/PrintFriendlyStaffDefaultCompany.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                            >
                                Printer Friendly Staff Overview
                            </a>
                        </div>
                    </div>
                </div>

        </div>
    );
};

export default TeamComponent;
