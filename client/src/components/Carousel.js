import React, { useState, useEffect } from 'react';
import './helpers/Carousel.css';

const ReactBackgroundCarousel = ({ children }) => {
    const [counter, setCounter] = useState(1);
    const [pause, setPause] = useState(false);
    const [loadedImages, setLoadedImages] = useState([]);
    const [isFirstSlide, setIsFirstSlide] = useState('first-slide');
    const [carouselInterval, setCarouselInterval] = useState(2500);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width

    const content = children;

    // Function to preload an image
    const preloadImage = (url) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            setLoadedImages((prevLoadedImages) => [...prevLoadedImages, url]);
        };
    };

    useEffect(() => {
        // Eager load all images
        content.forEach((item) => preloadImage(item.props.src));
    }, [content]);

    const handleNext = () => {
        if (counter !== content.length) {
            setCounter(counter + 1);
            if (isFirstSlide) {
                setIsFirstSlide('');
                setCarouselInterval(4000);
            }
        } else {
            setCounter(1);
        }
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (!pause) {
                handleNext();
            } else {
                clearInterval(interval);
            }
        }, carouselInterval);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth); // Update window width on resize
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='Carousel-container'>
            <div className={`slide ${isFirstSlide}`}>
                {content.map((item, index) => (
                    <div
                        className={counter - 1 === index ? 'show' : 'not-show'}
                        key={index}>
                       {loadedImages.includes(item.props.src) ? (
                    <img
                        src={
                            (windowWidth <= 1050)
                                ? `${item.props.src.replace('.webp', 'h.webp')}`
                                : (windowWidth <= 850)
                                    ? `${item.props.src.replace('.webp', 'l.webp')}`
                                    : (windowWidth <= 450)
                                        ? `${item.props.src.replace('.webp', 'm.webp')}`
                                        : (windowWidth <= 350)
                                            ? `${item.props.src.replace('.webp', 's.webp')}`
                                            : item.props.src
                                        
                        }
                        alt={item.props.alt}
                        className='carousel-img'
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />
                ) : (
                    item
                )}



                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReactBackgroundCarousel;
