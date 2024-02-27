import { useParams } from 'react-router-dom';
import { aboutExtra } from '../../data';
import PrivacyPolicy from './PrivacyPolicy';
import Error from '../Error';

const SingleAbout = () => {
    const { aboutId } = useParams();
    const about = aboutExtra.find(
        (about) =>
            about.name.toLowerCase().split(' ').join('-') ===
            aboutId.toLowerCase()
    );

    if (!about) {
        return <Error />;
    }
    return (
        <div className='about-content'>
            {about.title && <h2>{about.title}</h2>}
            {about.title === "Worker's Compensation" && (
                <img src={about.image} alt={about.title} />
            )}
            {about.content && (
                <div className='inner-content'>
                    {about.content.map((item, index) => {
                        return (
                            <div key={index} className='div-card'>
                                {item.subtitle && (
                                    <h4 className='div-card-title'>
                                        {item.subtitle}
                                    </h4>
                                )}
                                {item.body.map((listItem, index) => {
                                    if (listItem === "Render Privacy Policy") {
                                        return <PrivacyPolicy key={index} />;
                                    } else {
                                        return (
                                            <p key={index} className='about-description'>
                                                {listItem.includes(
                                                    'https://www'
                                                ) ? (
                                                    <a
                                                        href={listItem}
                                                        className='btn header-button-blue'>
                                                        {item.subtitle
                                                            ? item.subtitle
                                                            : 'Download Patient Registration Form'}
                                                    </a>
                                                ) : (
                                                    listItem
                                                )}
                                            </p>
                                        );
                                    }
                                })}
                            </div>
                        );
                    })}
                </div>
            )}

            {about.body && (
                <div className='about-info'>
                    <p className='about description'>{about.body}</p>
                    <div className='pop-out-content'>
                        <div className='about-grid'>
                            <div className='about-grid-item'>
                                <h3 className='about-grid-title'>
                                    {about.itemOne.subtitle}
                                </h3>
                                {about.itemOne.body.map((content, index) => {
                                    return (
                                        <a
                                            key={index}
                                            href={content.link}
                                            className='about-link btn'>
                                            {content.name}
                                        </a>
                                    );
                                })}
                            </div>
                            <div className='about-grid-item'>
                                <h3 className='about-grid-title'>
                                    {about.itemTwo.subtitle}
                                </h3>
                                {about.itemTwo.body.map((content, index) => {
                                    return (
                                        <a
                                            key={index}
                                            href={content.link}
                                            className='about-link btn'>
                                            {content.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleAbout;
