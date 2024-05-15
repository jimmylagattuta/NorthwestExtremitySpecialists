import { useParams } from 'react-router-dom';
import { services } from '../../data';
import Error from '../Error';

const SingleService = () => {
    const { serviceId } = useParams();
    const Service = services.find(
        (product) =>
            product.name.toLowerCase().split(' ').join('-') ===
            serviceId.toLowerCase()
    );

    if (!Service) {
        return <Error />;
    }
    console.log('services', services);
    return (
        <div className='page-container'>
            <div className='page-top-header'>
                <div className='page-image-container'>
                    <img
                        src={Service.image}
                        alt={Service.name}
                        className='page-image'
                        
                    />
                </div>
                <div className='page-info'>
                    <h2 className='page-title'>{Service.firstTitle}</h2>
                    {Service.description.map((item, index) => {
                        return <p key={index} className='page-description'>{item}</p>;
                    })}
                </div>
            </div>

            {Service.firstTitleBulletedList && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <ul className='bulleted-list'>
                                {Service.firstTitleBulletedList.map((item, index) => {
                                    return <li key={index} className='page-description'>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {Service.secondTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.secondTitle}</h2>
                            {Service.descriptionTwo && Service.descriptionTwo.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.secondTitleBulletedList && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <ul className='bulleted-list'>
                                {Service.secondTitleBulletedList.map((item, index) => {
                                    return <li key={index} className='page-description'>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {Service.descriptionAfterSecondBulletedList && (
                <>
                    <div className='popout-content'>
                        {Service.descriptionAfterSecondBulletedList.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}


            {Service.thirdTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.thirdTitle}</h2>
                            {Service.descriptionThree.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.thirdTitleBulletedList && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <ul className='bulleted-list'>
                                {Service.thirdTitleBulletedList.map((item, index) => {
                                    return <li key={index} className='page-description'>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {Service.descriptionAfterThirdBulletedList && (
                <>
                    <div className='popout-content'>
                        {Service.descriptionAfterThirdBulletedList.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}

            {Service.fourthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.fourthTitle}</h2>
                            {Service.descriptionFour.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}
            {Service.fourthTitleBulletedList && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <ul className='bulleted-list'>
                                {Service.fourthTitleBulletedList.map((item, index) => {
                                    return <li key={index} className='page-description'>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}
            
            {Service.descriptionAfterFourthBulletedList && (
                <>
                    <div className='popout-content'>
                        {Service.descriptionAfterFourthBulletedList.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}

            {Service.fifthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.fifthTitle}</h2>
                            {Service.descriptionFive && Service.descriptionFive.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}


            {Service.fifthTitleBulletedList && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <ul className='bulleted-list'>
                                {Service.fifthTitleBulletedList.map((item, index) => {
                                    return <li key={index} className='page-description'>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {Service.descriptionFiveBulletedList && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <ul className='bulleted-list'>
                                {Service.descriptionFiveBulletedList.map((item, index) => {
                                    return <li key={index} className='page-description'>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {Service.descriptionAfterFifthBulletedList && (
                <>
                    <div className='popout-content'>
                        {Service.descriptionAfterFifthBulletedList.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}
 
            {Service.sixthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.sixthTitle}</h2>
                            {Service.descriptionSix && Service.descriptionSix.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}


            {Service.sixthTitleBulletedList && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <ul className='bulleted-list'>
                                {Service.sixthTitleBulletedList.map((item, index) => {
                                    return <li key={index} className='page-description'>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {Service.seventhTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.seventhTitle}</h2>
                            {Service.descriptionSeven.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.eighthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.eighthTitle}</h2>
                            {Service.descriptionEight.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            
            {Service.ninthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.ninthTitle}</h2>
                            {Service.descriptionNine && Service.descriptionNine.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.tenthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.tenthTitle}</h2>
                            {Service.descriptionTen.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.eleventhTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.eleventhTitle}</h2>
                            {Service.descriptionEleven.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.twelvthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.twelvthTitle}</h2>
                            {Service.descriptionTwelve.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.thirteenthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.thirteenthTitle}</h2>
                            {Service.descriptionThirteen.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.fourteenthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.fourteenthTitle}</h2>
                            {Service.descriptionFourteen.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.fifteenthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.fifteenthTitle}</h2>
                            {Service.descriptionFifteen.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.sixteenthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.sixteenthTitle}</h2>
                            {Service.descriptionSixteen.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.seventeenthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.seventeenthTitle}</h2>
                            {Service.descriptionSeventeen.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.eighteenthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.eighteenthTitle}</h2>
                            {Service.descriptionEighteen.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.nineteenthTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.nineteenthTitle}</h2>
                            {Service.descriptionNineteen.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.twentiethTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.twentiethTitle}</h2>
                            {Service.descriptionTwenty.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.twentyFirstTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.twentyFirstTitle}</h2>
                            {Service.descriptionTwentyOne.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

            {Service.twentySecondTitle && (
                <>
                    <div className='popout-content'>
                        <div className='page-info'>
                            <h2 className='page-title'>{Service.twentySecondTitle}</h2>
                            {Service.descriptionTwentyTwo.map((item, index) => {
                                return <p key={index} className='page-description'>{item}</p>;
                            })}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default SingleService;
