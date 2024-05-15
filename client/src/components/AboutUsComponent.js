import { Link, NavLink } from 'react-router-dom';
import './helpers/AboutUsComponent.css'

const AboutUsComponent = () => {
    const handleLearnMoreClick = () => {
        // Replace 'your-url-here' with the actual URL you want to open
        window.open('your-url-here', '_blank');
    };

    return (
        <div className='about-container'>
            <div className='about-container-top'>
                <h1 className='about-title'>Northwest Extremity Specialists</h1>
                <p className='about-description'>
                We are committed to offering state-of-the-art orthopedic and podiatric treatment. Formed when four of Portland's top clinics—Tigard Orthopedics and Fracture Clinic, Cascade Foot and Ankle Specialists, Pacific Foot and Ankle Clinic, and Westside Foot and Ankle Specialists-- joined together, our team of doctors and staff provide full-service orthopedic and podiatric care from our 15 convenient locations throughout the Portland metropolitan area.                </p>
            </div>
            <div className='about-container-bottom'>
                <img aria-label="bottom left container" className='about-container-bottom-left'
                />
                <div className='about-container-bottom-right'>
                <h2 className='about-title-right'>
                    Why Choose Us?
                </h2>
            

                <p className='about-description-right'>
                    <ul>
                        <li>
                            Expedite your check-in process by completing New Patient Forms online
                        </li>
                    </ul>
                </p>
                <p className='about-description-right'>
                    <ul>
                        <li>
                            Tired of waiting on hold? Schedule your appointments, order medical records, and request prescription refills electronically
                        </li>
                    </ul>
                </p>
                <p className='about-description-right'>
                    <ul>
                        <li>
                            Update your medical history and pay bills from the privacy of your home
                        </li>
                    </ul>
                </p>
                <p className='about-description-right'>
                    <ul>
                        <li>
                            Verify your insurance eligibility and review your benefits prior to your appointment
                        </li>
                    </ul>
                </p>
                
                <div className='about-right-button'>
                    {/* Add onClick event */}
                    <button className='btn header-button-white' onClick={handleLearnMoreClick}>
                        Learn More
                    </button>
                </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUsComponent;
