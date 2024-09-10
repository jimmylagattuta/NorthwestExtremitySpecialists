import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { navMenu } from '../data';
import RequestAppointmentForm from './helpers/RequestAppointmentForm';
import './helpers/navbarHelpers/Navbar.css';
import './helpers/navbarHelpers/FormDiv.css';
import ForesightSquare from './helpers/navbarHelpers/ForesightSquare';
import ContactNav from './helpers/navbarHelpers/ContactNav';
import './helpers/navbarHelpers/ContactNav.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(null);
    const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false);
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const location = useLocation();

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const toggleMobileMenu = () => {
        console.log('toggleMobileMenu');
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    const submenuOpen = (menuName) => {
        console.log('submenuOpen');
        if (isSubmenuOpen === menuName) {
            // If the submenu is already open, close it
            setIsSubmenuOpen(null);
        } else {
            // If a different submenu is open, close it and open the clicked submenu
            setTimeout(() => {
                setIsSubmenuOpen(menuName);
            }, 250);
        }
    };
    
    const closeSubmenu = () => {
        setIsSubmenuOpen(null);
    };

    const resetMobileMenu = () => {
        console.log('resetMobileMenu');
        setIsMobileMenuOpen(false);
        setTimeout(() => {
            setIsSubmenuOpen(null);
        }, 0.25);
    };

    const locations = [
        'Cedar Mill',
        'Gresham Office',
        'Happy Valley Office',
        'Hoyt Office',
        'Milwaukie Office',
        'Newberg Washington Street Office',
        'Portland Northwest District Office',
        'Tigard Locust Office',
        'Tigard Oleson Office',
        'West Linn Office',
        'Wilsonville Office',
        'Cedar Mill Clinic',
        'Tigard Clinic',
        'Locust Clinic'
    ]

    const toggleAppointmentForm = () => {
        if (location.pathname === '/locations') {
            const scrollToHeight = document.body.scrollHeight * 0.8;
            const start = window.scrollY;
            const end = scrollToHeight;
            const duration = 1000; // Duration of the scroll animation in milliseconds
        
            let startTime;
        
            const scrollAnimation = (timestamp) => {
                if (!startTime) {
                    startTime = timestamp;
                }
        
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
        
                const easedProgress = easeInOutCubic(progress); // Apply easing function
        
                window.scrollTo(0, start + (end - start) * easedProgress);
        
                if (elapsed < duration) {
                    // Continue the animation
                    window.requestAnimationFrame(scrollAnimation);
                }
            };
        
            // Easing function for smooth scroll animation
            const easeInOutCubic = (t) =>
                t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
            // Start the animation
            window.requestAnimationFrame(scrollAnimation);
        }
    };

    const closeForm = () => {
        setIsPopupOpen(false); // Close the form
    };

    const generateDynamicLink = (item) => {
        let link;
        if (locations.includes(item)) {
            link = `/locations#${item.replace(/\s+/g, '-').toLowerCase()}`;
        } else {
            // Default link for other items
            link = `/${item.replace(/\s+/g, '-').toLowerCase()}`;
        }
    
        return (
            <NavLink
                key={item}
                to={link}
                className={({ isActive }) =>
                    isActive ? 'nav-link-nav active' : 'nav-link-nav'
                }>
                {item}
            </NavLink>
        );
    };

    const handlePayNowClick = (e) => {
        e.preventDefault();
        window.open("https://www.healowpay.com/HealowPay/jsp/healow/login.jsp", "_blank", "noopener noreferrer");
    };
    
    return (
        <header className='navbar-div'>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div className="navbar-container">
                    <Link to='/' className='logo-link-navbar' style={{ textDecorationLine: 'none' }}>
                        <div className='logo-and-title'>
                            <img
                                src='../logo.png'
                                alt='Northwest Extremity Specialists'
                                className='navbar-logo'
                            />
                            <div>
    
                            </div>
                        </div>
                    </Link>
                    <div className='navbar-buttons-nav'>
    
                        <div className="call-contact-download">
                            <div className="downloads-call-us">
                
                                <NavLink
                                    onClick={toggleAppointmentForm}
                                    to={{ pathname: '/locations', hash: '#chatbox' }}
                                >
                                    <span className='nav-button'>
                                        Contact Us
                                    </span>
                                </NavLink>
                                <NavLink
                                    to="https://www.healowpay.com/HealowPay/jsp/healow/login.jsp"


                                >
                                    <span className='nav-button-white'>
                                        Pay Now
                                    </span>
                                </NavLink>
                            </div>

                            <div className="downloads-call-us">
                                <div
                                    onClick={() => window.open('/NESPaperwork.pdf', '_blank')}
                                >
                                    <span className='nav-button-white'>
                                        Download Forms
                                    </span>
                                </div>
                                <span className='nav-button'>
                                    <ContactNav />
                                </span>
                            </div>
                        </div>
    
                        {isPopupOpen && (
                            <div id="form-div">
                                <ForesightSquare togglePopup={togglePopup} />
                            </div>
                        )}
                        {showThankYouMessage && (
                            <div className="thank-you-message">
                                Thank you for the message! We will be with you shortly.
                            </div>
                        )}
                    </div>
                    <button
                        aria-label="Mobile navbar button"
                        className='mobile-menu-button-navbar'
                        onClick={toggleMobileMenu}
                    >
                        <i
                            className={
                                isMobileMenuOpen ? 'fa fa-times' : 'fa fa-bars'
                            }
                            id="animate-bars"
                            aria-hidden='true'></i>
                    </button>
                </div>
                <div>
                </div>
            </div>
            <nav
                className={`navbar ${isSubmenuOpen}-open ${
                    isMobileMenuOpen ? 'mobile-menu-show' : ''
                }`}>
                {navMenu.map((item, index) => {
                    return (
                        <div key={index} className={`nav-link-container ${item.menu}-nav`}>
                            <div className='link-items'>
                                <NavLink
                                    onClick={resetMobileMenu}
                                    key={item.menu}
                                    to={item.link}
                                    className={({ isActive }) =>
                                        isActive ? 'nav-link-nav active' : 'nav-link-nav'
                                    }>
                                    {item.menu.replace(/Office$/, '')}
                                </NavLink>
                                {item.subMenuItems && (
                                    <button
                                        onClick={() => submenuOpen(item.menu)} 
                                        className='mobile-toggle-submenu'
                                        >
                                        {isSubmenuOpen === item.menu ? (
                                            <i className='fas fa-minus'></i>
                                        ) : (
                                            <i className='fas fa-plus'></i>
                                        )}
                                    </button>
                                )}
                            </div>
                            {item.subMenuItems && (
    <div className='submenu'>
        {isSubmenuOpen !== null && (
            <NavLink
                onClick={resetMobileMenu}
                key={item.menu}
                to={item.link}
                className={({ isActive }) =>
                    isActive ? 'sub-link mobile-nav-link active' : 'sub-link mobile-nav-link'
                }
                end>
                All {item.menu}
            </NavLink>
        )}
        <div className={`submenu-list ${item.subMenuItems.length > 18 ? 'submenu-multi-column' : item.subMenuItems.length > 6 ? 'submenu-two-column' : ''}`}>
            {((isSubmenuOpen !== null) || (window.innerWidth >= 1000)) && item.subMenuItems.map((subItem) => {
                console.log("Mapping subItem:", subItem);
                const subItemLink = item.menu === 'Physicians'
                    ? `/providers/${subItem.replace(/\s+/g, '-').toLowerCase()}` // Correctly form the URL for physicians
                    : `${item.link}/${subItem.replace(/\s+/g, '-').toLowerCase()}`; // Handle other links appropriately
                console.log("subItemLink:", subItemLink);
                
                return (
                    <NavLink
                        onClick={() => {
                            console.log("NavLink clicked, subItem:", subItem);
                            resetMobileMenu();
                        }}
                        key={subItem}
                        to={subItemLink}
                        className={({ isActive }) =>
                            isActive ? 'sub-link active' : 'sub-link'
                        }>
                        {subItem}
                    </NavLink>
                );
            })}
        </div>
    </div>
)}

                        </div>
                    );
                })}
            </nav>
            {isMobileMenuOpen && (
                <div
                    className='mobile-menu-backdrop'
                    onClick={toggleMobileMenu}></div>
            )}
        </header>
    );
};

export default Navbar;
