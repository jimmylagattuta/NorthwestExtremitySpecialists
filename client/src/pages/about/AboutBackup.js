import { useState, useEffect } from 'react';
import { aboutObj, aboutObjOther } from '../../data';

const About = () => {
    const [isInitialRender, setIsInitialRender] = useState(true); // Track the initial render
    const [imagePosition, setImagePosition] = useState('left'); // Set initial image position to 'left'

    useEffect(() => {
        // Skip toggling the image position on the initial render
        if (!isInitialRender) {
            setImagePosition(prevPosition => (prevPosition === 'left' ? 'right' : 'left')); // Toggle image position
        }
        setIsInitialRender(false); // Update the initial render flag after the first render
    }, [isInitialRender]);

    return (
        <div className="oar-about-container">
            {aboutObj.map((item, index) => {
                // Alternate the image position after the first iteration
                const alignImage = imagePosition === 'left' ? 'flex-start' : 'flex-end';
                const flexDirection = imagePosition === 'left' ? 'row' : 'row-reverse';
                return (
                    <div key={index} className="oar-about-info" style={{ display: 'flex', alignItems: alignImage, flexDirection: flexDirection, position: 'relative', height: '66%' }}>
                        {/* Render the doctor image */}
                        <img
                            src='https://i.imgur.com/V1JENY4h.webp'
                            alt="Doctor"
                            className="oar-doctor-image"
                            style={{ position: 'absolute', bottom: 7, left: 0, width: '42%', zIndex: 1 }}
                        />
                        {/* Render the main image and text */}
                        <div className="oar-about-text">
                            <h2 style={{ margin: '5px 0px 5px -0px', padding: '0px !important' }}>{item.nameOne}</h2>
                            <p style={{ margin: '5px 0px 5px 0px', padding: '0px !important' }}>{item.descriptionOne}</p>
                            {item.descriptionOneBullettedList && Array.isArray(item.descriptionOneBullettedList) && (
                                <ul className='bullet-list-about'>
                                    {item.descriptionOneBullettedList.map((bulletItem, bulletIndex) => (
                                        <li key={bulletIndex}>
                                            {bulletItem === 'And More!' ? <h3>{bulletItem}</h3> : bulletItem}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {Array.isArray(item.descriptionTwo) && item.descriptionTwo.map((itemTwo, index) => (
                                <p key={index}>{itemTwo}</p>
                            ))}
                        </div>
                        {/* Render the main image */}
                        <div className="oar-about-image-container" style={{ position: 'relative', zIndex: 0 }}>
                            <img
                                src='https://i.imgur.com/EBJUAgp.webp'
                                alt={item.nameOne}
                                className="oar-about-image"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                );
            })}

            <div style={{ borderBottom: '1px solid black' }}></div>
            {aboutObjOther.map((item, index) => {
                // Alternate the image position after the first iteration
                const alignImage = imagePosition === 'left' ? 'flex-start' : 'flex-end';
                const flexDirection = imagePosition === 'left' ? 'row' : 'row-reverse';
                return (
                    <div key={index} className="oar-about-info" style={{ marginTop: '10px', width: '80vw', display: 'flex', alignSelf: 'flex-end', alignItems: 'center', flexDirection: flexDirection, position: 'relative', height: '70%', boxShadow: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img
                                src='https://i.imgur.com/lGh1bGO.webp'
                                alt="Doctor"
                                className="oar-design-image"
                                style={{ position: 'absolute', right: 2, width: '30%', zIndex: 1 }}
                            />
                            {/* Render the main image and text */}
                            {/* Render the main image */}
                            <div className="oar-about-image-container" style={{ position: 'relative', zIndex: 0, justifyContent: 'center' }}>
                                <img
                                    src='https://i.imgur.com/she9M1h.webp'
                                    alt={item.nameOne}
                                    className="oar-about-image"
                                    style={{ maxWidth: '40%', height: 'auto', width: '40%', alignSelf: 'flex-end' }}
                                />
                            </div>
                        </div>
                        <div className="oar-about-text">
                            <h2 style={{ margin: '5px 0px 5px -0px', padding: '0px !important' }}>{item.nameOne}</h2>
                            <p style={{ margin: '5px 0px 5px 0px', padding: '0px !important' }}>{item.descriptionOne}</p>
                            {item.descriptionOneBullettedList && Array.isArray(item.descriptionOneBullettedList) && (
                                <ul className='bullet-list-about' style={{ maxWidth: '400px' }}>
                                    {item.descriptionOneBullettedList.map((bulletItem, bulletIndex) => (
                                        <li key={bulletIndex}>
                                            {bulletItem === 'And More!' ? <h3>{bulletItem}</h3> : bulletItem}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {Array.isArray(item.descriptionTwo) && item.descriptionTwo.map((itemTwo, index) => (
                                <p key={index}>{itemTwo}</p>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default About;



// {aboutObjOther.map((item, index) => {
//     // Alternate the image position after the first iteration
//     const alignImage = 'flex-end';
//     const flexDirection = imagePosition === 'left' ? 'row' : 'row-reverse';
//     return (
//         <div key={index} className="oar-about-info" style={{ display: 'flex', alignItems: alignImage, flexDirection: flexDirection, alignSelf: 'flex-end', position: 'relative', height: '66%' }}>
//             {/* Render the doctor image */}
//             <img
//                 src='https://i.imgur.com/V1JENY4h.webp'
//                 alt="Doctor"
//                 className="oar-doctor-image"
//                 style={{ position: 'absolute', bottom: 7, left: 0, width: '42%', zIndex: 1 }}
//             />
//             {/* Render the main image and text */}
//             <div className="oar-about-text">
//                 <h2>{item.nameOne}</h2>
//                 <p>{item.descriptionOne}</p>
//                 {item.descriptionOneBullettedList && Array.isArray(item.descriptionOneBullettedList) && (
//                     <ul className='bullet-list-about'>

//                     </ul>
//                 )}
//                 {Array.isArray(item.descriptionTwo) && item.descriptionTwo.map((itemTwo, index) => (
//                     <p key={index}>{itemTwo}</p>
//                 ))}
//             </div>
//             {/* Render the main image */}
//             <div className="oar-about-image-container" style={{ position: 'relative', zIndex: 0 }}>
//                 <img
//                     src='https://i.imgur.com/EBJUAgp.webp'
//                     alt={item.nameOne}
//                     className="oar-about-image"
//                     style={{ maxWidth: '100%', height: 'auto' }}
//                 />
//             </div>
//         </div>
//     );
// })}