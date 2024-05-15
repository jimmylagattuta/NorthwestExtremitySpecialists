import React, { useState } from 'react';
import { officesData } from '../../../data';

import './ContactNav.css';

const ContactNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredDetails, setHoveredDetails] = useState('');
  const [hoveredPhoneDetails, setHoveredPhoneDetails] = useState('');

  console.log('hoveredDetails', hoveredDetails);
  console.log('hoveredPhoneDetails', hoveredPhoneDetails);

  const handleMouseEnter = (item, details, isPhone, office) => {
    setHoveredItem(item);
  
    let lines = details.split('\n');
    let addressLines = [];
    let phoneNumberLines = [];
  
    // Iterate through each line to categorize as address or phone number
    lines.forEach((line) => {
      // Check if the line matches a phone number pattern
      const phoneNumberRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
      if (phoneNumberRegex.test(line)) {
        phoneNumberLines.push(line);
      } else {
        addressLines.push(line);
      }
    });
  
    // Highlight the first phone number
    if (isPhone && phoneNumberLines.length > 0) {
      const highlightedPhoneNumber = `<p style="color: yellow;">${phoneNumberLines[0]}</p>`;
      setHoveredDetails(
        details.replace(phoneNumberLines[0], highlightedPhoneNumber)
      );
    } else {
      setHoveredDetails(
        details.replace(
          addressLines.join('\n'),
          `<p style="color: yellow;">${addressLines.join('\n')}</p>`
        )
      );
      setHoveredPhoneDetails(''); // Clear the phone details
    }
  
    // Ensure "Fax" starts on a new line
    setHoveredDetails((prevDetails) => prevDetails.replace('Fax:', '\nFax:'));
  };
  
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
    setHoveredDetails('');
  };

  const handleItemOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  const getHoveredStyle = (item) => {
    return item === hoveredItem ? { backgroundColor: 'white' } : {};
  };
  const getPhoneHoveredStyle = () => {
    return hoveredItem !== 'phone' ? {} : { backgroundColor: 'yellow' };
  };
  
  const getAddressHoveredStyle = () => {
    return hoveredItem !== 'address' ? {} : { backgroundColor: 'yellow' };
  };
  

  return (
    <div className={isMenuOpen ? 'menu-open' : ''}>
      <div onClick={handleItemOpen} className="nav-phone-and-seperater">
        <p className="words-appear">Call/Directions</p>
      </div>
      {isMenuOpen && (
        <div className="contact-nav-menu">
          {officesData.map(office => (
            <div className='default-company-call-directions' key={office.id}>
              <a
                id="map-icon-nav"
                href={`tel:${office.phone}`}
                title='Phone clickable'
                onMouseEnter={() => handleMouseEnter(office.city, `${office.addressOne}\n${office.addressTwo}\n${office.phone}\nFax: ${office.fax}`, true, office)}
                onMouseLeave={handleMouseLeave}
                style={getPhoneHoveredStyle()}
              >
                <i id="nav-phone-call" className='fas fa-mobile-alt fa-1x'></i>
              </a>
              <p id="map-icon-nav-text" onMouseEnter={() => handleMouseEnter(office.city, `${office.addressOne}\n${office.addressTwo}\n${office.phone}\nFax: ${office.fax}`, true, office)} onMouseLeave={handleMouseLeave}>
                {office.city}
              </p>
              <a
                id="map-icon-nav"
                href={`https://maps.google.com/?q=${office.addressOne.replace(/\s/g, '+')},${office.addressTwo.replace(/\s/g, '+')}`}
                onMouseEnter={() => handleMouseEnter(office.city, `${office.addressOne}\n${office.addressTwo}\n${office.phone}\nFax: ${office.fax}`, false)}
                onMouseLeave={handleMouseLeave}
                style={getAddressHoveredStyle()}
              >
                <i id="nav-map-go" className='fas fa-map-marked-alt fa-1x'></i>
              </a>
            </div>
          ))}
          {hoveredDetails && (
            <div style={{ maxWidth: '220px', backgroundColor: 'rgb(0, 64, 143)', zIndex: '8', padding: '10px 5px 5px 5px', lineHeight: '1.5' }}>
              <p dangerouslySetInnerHTML={{ __html: hoveredDetails }}></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactNav;
