import React, { useState } from 'react';
import './ForesightSquare.css';
import MorphingFont from './MorphingFont';
const ForesightSquare = ({ togglePopup }) => {

    return (
        <div className="foresight-square">
            <article id="foresight-article">
            <div className="foresight-form">
                                    <div className='text-and-close'>
                                    <button onClick={togglePopup} className='close-button'>
                                        <i className='fas fa-times'></i> {/* Close icon */}
                                    </button>
                                    <h4 className="alert-form-foresight">* You need to bring these forms finished on first visit.</h4>
                                    </div>
                                    <div className="form-group-foresight">

                                        <div className='mobile-change-to-row'>
                                            <div>
                                                <h4 className="foresight-subheader">Download</h4>
                                            </div>
                                            {/* <h3 className='foresight-subheader'>Registration Form</h3> */}
                                            <MorphingFont texts={["Registration Form", "Formulario de Registro de Pacientes"]} />
                                        </div>                  


                                        <div className='glass-buttons-foresight'>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/Registration.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                English
                                            </a>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/RegistrationSpanish.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                Español
                                            </a>
                                        </div>
                                    </div>
                                    <div className="form-group-foresight">
                                        <div className='mobile-change-to-row'>
                                            <div>
                                                <h4 className="foresight-subheader">Download</h4>
                                            </div>
                                            <MorphingFont texts={["Authorization Form", "Formulario de Autorización"]} />
                                        </div>
                                        <div className='glass-buttons-foresight'>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/DAR.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                English
                                            </a>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/DARSpanish.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                Español
                                            </a>
                                        </div>
                                    </div>
                                    <div className="form-group-foresight">
                                        <div className='mobile-change-to-row'>
                                            <div>
                                                <h4 className="foresight-subheader">Download</h4>
                                            </div>
                                            <MorphingFont texts={["Release Form", "Formulario de Exención"]} />
                                        </div>
                                        <div className='glass-buttons-foresight'>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/authorization.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                English (Release)
                                            </a>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/authorizationSpanish.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                Español (Lanzamiento)
                                            </a>
                                        </div>
                                    </div>
                                    <div className="form-group-foresight">
                                        <div className='mobile-change-to-row'>
                                            <div>
                                                <h4 className="foresight-subheader">Download</h4>
                                            </div>
                                            <MorphingFont texts={["Medical History", "Historial Médico"]} />
                                        </div>
                                        <div className='glass-buttons-foresight'>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/MedHistory.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                English
                                            </a>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/MedHistorySpanish.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                Español
                                            </a>
                                        </div>
                                    </div>
                                    <div className="form-group-foresight">
                                        <div className='mobile-change-to-row'>
                                            <div>
                                                <h4 className="foresight-subheader">Download</h4>
                                            </div>
                                            <MorphingFont texts={["Privacy Form", "Formulario de Privacidad"]} />
                                        </div>
                                        <div className='glass-buttons-foresight'>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/PrivacyNotice.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                English {"(HIPAA)"}
                                            </a>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/PrivacyNoticeSpanish.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                Español {"(HIPAA)"}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="form-group-foresight">
                                        <div className='mobile-change-to-row'>
                                            <div>
                                                <h4 className="foresight-subheader">Download</h4>
                                            </div>
                                            <MorphingFont texts={["Financial Form", "Forma Financiera"]} />
                                        </div>                                 
                                        <div className='glass-buttons-foresight'>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/FinancialPolicy.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                English
                                            </a>
                                            <a
                                                className='btn header-button-yellow-form-foresight'
                                                href={process.env.PUBLIC_URL + '/FinancialPolicySpanish.pdf'}
                                                target="_blank" // This opens the PDF in a new tab
                                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                            >
                                                Español
                                            </a>
                                        </div>
                                    </div>
                                </div>
            </article>
        </div>
    );
};

export default ForesightSquare;