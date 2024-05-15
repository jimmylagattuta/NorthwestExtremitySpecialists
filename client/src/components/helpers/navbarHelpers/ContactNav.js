import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

import './ContactNav.css';

const ContactNav = () => {
  const handleCallDirectionsClick = () => {
    // Redirect to the locations page
    window.location.href = '/locations';
  };

  return (
    <div>
      <div onClick={handleCallDirectionsClick} >
        <p className="words-appear">Call/Directions</p>
      </div>
    </div>
  );
};

export default ContactNav;
