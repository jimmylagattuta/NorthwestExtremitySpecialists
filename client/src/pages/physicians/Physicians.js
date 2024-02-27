import { Link } from 'react-router-dom';
import { physicians } from '../../data';

const Physicians = () => {
    return (
        <div className='page-container'>
            <div className='physician-header'>
                <h1 className='main-page-title'>Meet Our Physicians</h1>
                <p className='main-page-description'>
                    Located in Riverside, La Grange, and Chicago.
                </p>
            </div>
            <div className='page-grid'>
                {physicians.map((physician) => {
                    return (
                        <div style={{ boxShadow: "6px 6px 8px #ddd" }} className='grid-item' key={physician.name}>
                            <div className='image-container'>
                                <Link
                                    className='physician-link'
                                    to={`/physicians/${
                                        physician.name
                                            .toLowerCase()
                                            .split(' ')
                                            .join('-') // Replace spaces with hyphens
                                    }`}
                                >
                                    <img
                                        src={physician.imageMedium}
                                        alt={physician.name}
                                        className='grid-image'
                                    />
                                </Link>
                            </div>
                            <Link
                                className='physician-link'
                                to={`/physicians/${
                                    physician.name
                                        .toLowerCase()
                                        .split(' ')
                                        .join('-') // Replace spaces with hyphens
                                }`}
                            >
                                <h5 className='physician-name'>{physician.name}</h5>
                            </Link>
                            <Link
                                className='physician-link'
                                to={`/physicians/${
                                    physician.name
                                        .toLowerCase()
                                        .split(' ')
                                        .join('-') // Replace spaces with hyphens
                                }`}
                            >
                                Read Bio
                                <i className='fas fa-arrow-right physician-bio-icon'></i>
                            </Link>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Physicians;
