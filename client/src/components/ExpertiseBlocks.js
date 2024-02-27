import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { expertiseBlocks } from '../data';
import './helpers/ExpertiseBlocks.css';

const ExpertiseBlocks = () => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            setShowComponent(true);
        }, 500); // Adjust the delay time (in milliseconds) as needed

        // Cleanup function to clear the timeout in case the component unmounts before the delay finishes
        return () => clearTimeout(delay);
    }, []);

    if (!showComponent) {
        return null; // Return null to prevent rendering the component until the delay is over
    }

    return (
        <div className='expertise-grid'>
            {expertiseBlocks.map((block, index) => {
                return (
                    <div key={index} className='expertise-item'>
                        <div className='expertise-top'>
                            <div className='link-item'>
                                <Link
                                    className='expertise-image-link'
                                    to={`/services/${block.name
                                        .toLowerCase()
                                        .split(' ')
                                        .join('-')}`}>
                                    <img
                                        src={block.image}
                                        alt={block.name}
                                        className='expertise-image'
                                        loading="lazy"
                                    />
                                </Link>
                            </div>
                        </div>
                        <Link
                            className='expertise-name'
                            to={`/services/${block.name
                                .toLowerCase()
                                .split(' ')
                                .join('-')}`}>
                            {block.name}
                            <i class="fas fa-angle-double-right"></i>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default ExpertiseBlocks;
