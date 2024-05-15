// OfficeCard.js
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { officesData } from '../../data';

const InfoWindow = ({ place, handleInfoWindowClose }) => {
    const getOfficeHours = (city) => {
        switch (city) {
            case 'Bridgeport Office':
                return '8:00 a.m. – 5:00 p.m. Every 1st & 3rd Wednesday';
            case 'Cedar Mill':
                return '8 a.m. - 5 p.m. Mon - Thurs\n8 a.m. - 12 p.m. Fri';
            case 'Gresham Office':
                return 'Every 2nd & 4th Friday from 8 a.m. - 12 p.m.';
            case 'Happy Valley Office':
                return '8 a.m. –12 p.m. Fridays';
            case 'Hoyt':
                return '8 a.m. - 5 p.m. Mon - Thurs';
            case 'Milwaukie Office':
                return '9 a.m. – 5 p.m. Mon – Thurs\n9 a.m - 4 p.m. Fri';
            case 'Newberg Washington Street Office':
                return '8:30 a.m. - 4:30 p.m. Monday, Wednesday and Thursday\n8:30 a.m. - 3:00 p.m Every 2nd & 4th Tuesday\n8:30 a.m. - 2:00 p.m Fri';
            case 'Portland Northwest District Office':
                return '8 a.m. – 4 p.m. Tues\n9 a.m. - 6 p.m. Every 2nd and 4th Wed\n8 a.m. - 12 p.m. Every 1st and 3rd Fri';
            case 'Sherwood Office':
                return 'By appointment only';
            case 'Tanasbourne Office':
                return 'By appointment only';
            case 'Tigard Locust Office':
                return '8 a.m. – 5 p.m. Mon – Thurs\n8 a.m - 2:30 p.m. Fri';
            case 'Tigard Oleson Office':
                return '8 a.m. – 5 p.m. Mon – Thu\n8 a.m. – 1 p.m. Fri';
            case 'West Linn Office':
                return '8 a.m. – 5 p.m. Mon – Thurs\n8 a.m - 4 p.m. Fri';
            case 'Wilsonville Office':
                return '8 a.m. – 5 p.m. Wednesday';
            default:
                return '';
        }
    };
    
    return (
        <div className='location-info-window'>
            <div className="location-card-info">
                <div className='location-card-words'>
                    <h2 style={{ fontSize: 18, marginBottom: 5 }}>{place.city}</h2>
                    <div className='info-window-text-cards'>{place.addressOne}</div>
                    <div className='info-window-text-cards'>{place.addressTwo}</div>
                    <div className='info-window-text-cards' style={{ marginTop: 5 }}>
                        <span style={{ fontStyle: 'bold' }}>Phone:</span> {place.phone}
                    </div>
                    <div className='info-window-text-cards'>
                        <span style={{ fontStyle: 'bold' }}>Fax:</span> {place.fax}
                    </div>

                        
                    <h2 style={{ fontSize: 14, marginBottom: 3, marginTop: 3 }}>
                        Hours of Operation
                    </h2>
                    <div className='info-window-text-cards'>
                        {getOfficeHours(place.city)}
                    </div>
                    <div className='info-window-icons-cards'>
                        <a
                            className='info-window-icon'
                            href={`https://maps.google.com/?q=${place.addressOne
                            .split(' ')
                            .join('+')}${place.addressTwo.split(' ').join('+')}`}>
                            <i
                                style={{
                                    fontSize: 25,
                                    margin: '10px 20px 0 0',
                                }}
                                className='fas fa-map-marked-alt fa-1x'></i>
                        </a>
                        <div className='mobile-show'>
                            <a
                                className='info-window-icon'
                                href={`tel:+1${place.phone.split('-').join('')}`}
                                title='Phone clickable'>
                                <i style={{ fontSize: 28, marginTop: '10px' }} className='fas fa-mobile-alt fa-2x'></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='info-window-image-container-cards'>
                    <img
                        src={place.image}
                        alt={place.city}
                        className='info-window-image-cards'
                        />
                </div>
            </div>
        </div>
    );
};

const Marker = ({
    show,
    place,
    handleInfoWindowClose,
    handleHover,
    id,
    markerSelected,
}) => {
    return (
        <>
            <i
                className={
                    show
                        ? 'fas fa-map-marker-alt fa-2x active-marker'
                        : 'fas fa-map-marker-alt fa-2x'
                }
                aria-hidden='true'
                onMouseLeave={() => {
                    if (!markerSelected) {
                        handleInfoWindowClose();
                    }
                }}
                ></i>
            {/* {show && (
                <InfoWindow
                    place={place}
                    handleInfoWindowClose={handleInfoWindowClose}
                    markerSelected={markerSelected}
                />
            )} */}
        </>
    );
};
const OfficeCard = () => {
    const [offices, setOffices] = useState(officesData);
  
    return (
      <div className='office-card'>
        {offices.map((place) => (
          <div key={place.id} className='map-container-cards'>
            <GoogleMapReact
              defaultZoom={15}
              defaultCenter={{
                lat: place.coordinates.lat,
                lng: place.coordinates.lng,
              }}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_REACT_KEY,
                v: 'weekly',
              }}
            >
              <Marker
                lat={place.coordinates.lat}
                lng={place.coordinates.lng}
                place={place}
                show={true}
                handleInfoWindowClose={() => {}}
                id={place.id}
              />
            </GoogleMapReact>
            <InfoWindow
                    place={place}
                    handleInfoWindowClose={() => {}}
            />
          </div>
        ))}
      </div>
    );
  };
  
export default OfficeCard;
