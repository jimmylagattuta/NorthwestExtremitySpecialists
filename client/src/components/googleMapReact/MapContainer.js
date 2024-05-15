import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { officesData } from '../../data';
import './helpers/MapContainer.css';

const FloatingOfficeInfo = ({
    offices,
    handleMarkerClick,
    markerSelected,
    resetSelection,
}) => {
    const officesPerPage = 4;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(offices.length / officesPerPage);

    const handleNextClick = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const [useChevronLeft, setUseChevronLeft] = useState(false);
    const [useChevronRight, setUseChevronRight] = useState(false); // Define state variable

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1160) {
                setUseChevronLeft(true);
                setUseChevronRight(true);
            } else {
                setUseChevronLeft(false);
                setUseChevronRight(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const startIdx = currentPage * officesPerPage;
    const visibleOffices = offices.slice(startIdx, startIdx + officesPerPage);
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
        <div className='map-float-menu'>
            <div className='pagination-arrows'>
                <button
                    className='pagination-arrow'
                    aria-label="up and left"
                    onClick={handlePrevClick}
                    disabled={currentPage === 0}
                >
                    {useChevronLeft ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-up"></i>}
                </button>
            </div>
            {visibleOffices.map((place, index) => {
                return (
                    <div
                        key={index + startIdx}
                        className={
                            place.show
                                ? `map-float-info-container show-extra`
                                : 'map-float-info-container'
                        }
                        onClick={() => {
                            if (markerSelected === place.id) {
                                resetSelection();
                            } else {
                                handleMarkerClick(place.id);
                            }
                        }}>
                        <div
                            className='map-float-mobile-background'
                            style={{
                                backgroundImage: `url('${place.image}')`,
                            }}></div>
                        <div className='map-float-menu-info'>
                            <h2 className='map-float-title'>{place.city}</h2>
                            <div className='map-float-info'>
                                {place.addressOne}
                            </div>
                            <div className='map-float-info'>
                                {place.addressTwo}
                            </div>
                            <div className='map-float-info'>{place.phone}</div>
                            <div className='map-float-info'>
                                Fax: {place.fax}
                            </div>
                        </div>
                        <div className='map-float-menu-extra'>
                            <h2 className='map-float-title'>
                                Hours of Operation
                            </h2>
                            <div className='map-float-info'>
                                {getOfficeHours(place.city)}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className='pagination-arrows'>
                <button
                    className='pagination-arrow'
                    aria-label="down and right"
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages - 1}
                >
                    {useChevronRight ? <i className="fas fa-chevron-right"></i> : <i className="fas fa-chevron-down"></i>}
                </button>
            </div>
        </div>
    );
};

const InfoWindow = ({ place, handleInfoWindowClose, markerSelected }) => {
    return (
        <div
            className={`${
                markerSelected
                    ? `info-window-container marker-selected ${place.city
                          .split(' ')
                          .join('-')
                          .toLowerCase()}-office`
                    : `info-window-container ${place.city
                          .split(' ')
                          .join('-')
                          .toLowerCase()}-office`
            }`}>
            <button
                className='close-info-window'
                onClick={handleInfoWindowClose}>
                <i className='fa fa-times' aria-hidden='true'></i>
            </button>
            <h2 style={{ fontSize: 16, marginBottom: 5 }}>{place.city}</h2>
            <div className='info-window-text'>{place.addressOne}</div>
            <div className='info-window-text'>{place.addressTwo}</div>
            <div className='info-window-text' style={{ marginTop: 5 }}>
                <span style={{ fontStyle: 'bold' }}>Phone:</span> {place.phone}
            </div>
            <div className='info-window-text'>
                <span style={{ fontStyle: 'bold' }}>Fax:</span> {place.fax}
            </div>
            <div className='mobile-show'>
                <h2 style={{ fontSize: 14, marginBottom: 3, marginTop: 3 }}>
                    Hours of Operation
                </h2>
                <div className='info-window-text'>
                    {place.city === 'Eastwood' ? 'Mon, Tue, Thu, Fri' : (place.city === 'Rivercity' ? 'Mon, Tue, Wed, Fri' : 'Monday - Friday')}
                </div>
                <div className='info-window-text'>8AM-5PM</div>
            </div>
            <div className='info-window-icons'>
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
                <a
                    className='info-window-icon'
                    href={`tel:+1${place.phone.split('-').join('')}`}
                    title='Phone clickable'>
                    <i className='fas fa-mobile-alt fa-2x'></i>
                </a>
            </div>
            <div className='info-window-image-container'>
                <img
                    src={place.image}
                    alt={place.city}
                    className='info-window-image'
                />
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
                onMouseEnter={() => {
                    handleHover(id);
                }}></i>
            {show && (
                <InfoWindow
                    place={place}
                    handleInfoWindowClose={handleInfoWindowClose}
                    markerSelected={markerSelected}
                />
            )}
        </>
    );
};

const MapContainer = () => {
    const [centered, setCentered] = useState(null);
    const [zoomed, setZoomed] = useState(null);
    const [offices, setOffices] = useState(officesData);
    const [markerSelected, setMarkerSelected] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(11);

    // const head = document.getElementsByTagName('head')[0];
    // const insertBefore = head.insertBefore;
    // head.insertBefore = function (newElement, referenceElement) {
    //     if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {
    //         return;
    //     }
    //     insertBefore.call(head, newElement, referenceElement);
    // };

    const handleInfoWindowClose = () => {
        setOffices(
            offices.map((item) => {
                item.show = false;

                return item;
            })
        );
    };

    const showInfo = (key) => {
        let selectedOffice = null;

        const OfficesMod = offices.map((item) => {
            if (item.id === +key) {
                item.show = true;

                selectedOffice = item;
            } else {
                item.show = false;
            }

            return item;
        });

        setOffices(OfficesMod);

        return selectedOffice.coordinates;
    };
    const defaultCompanyGoogleMaps = process.env.REACT_APP_GOOGLE_MAPS_REACT_KEY;
    const handleMarkerClick = (key) => {
        console.log('handleMarkerClicked');
        const coordinates = showInfo(key);
        setCentered(coordinates);
        setZoomed(16);
        setMarkerSelected(+key);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1160) {
                console.log('setting zoom 9(Mobile)');
                setZoomLevel(9); // Adjust zoom level to 9
            } else {
                console.log('setting zoom 10(Desktop)');
                setZoomLevel(10); // Set back to default zoom level
            }
        };
        
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const resetSelection = () => {
        console.log('resetSelection setZoomed(zoomLevel)');
        setZoomed(zoomLevel);
        setCentered({ lat: 45.4370, lng: -122.7224 });
        setMarkerSelected(null);
        handleInfoWindowClose();
    };
    return (
        
        <div className='map-container'>
            <FloatingOfficeInfo
                handleMarkerClick={handleMarkerClick}
                offices={offices}
                markerSelected={markerSelected}
                resetSelection={resetSelection}
            />
            {offices.length > 0 && (
                <GoogleMapReact
                    defaultZoom={11}
                    defaultCenter={{ lat: 45.4370, lng: -122.7224 }}
                    center={centered}
                    zoom={zoomed}
                    bootstrapURLKeys={{
                        key: defaultCompanyGoogleMaps,
                        v: 'weekly',
                    }}
                    onChildClick={
                        !markerSelected ? handleMarkerClick : resetSelection
                    }>
                    {offices.map((place) => (
                        <Marker
                            key={place.id}
                            lat={place.coordinates.lat}
                            lng={place.coordinates.lng}
                            place={place}
                            show={place.show}
                            handleInfoWindowClose={handleInfoWindowClose}
                            id={place.id}
                            handleHover={showInfo}
                            markerSelected={markerSelected}
                        />
                    ))}
                </GoogleMapReact>
            )}
        </div>
    );
};

export default MapContainer;
