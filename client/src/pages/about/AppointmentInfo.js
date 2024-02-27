import React from 'react';
import './helpers/AppointmentInfo.css';

const AppointmentInfo = () => {
  return (
    <div className="appointment-info">
      <article id="appointment-form-article">
        <div className="appointment-form">
     
          <section className="for-your-appointment">
            <h2>For Your Appointment</h2>
            <p>Please call the office to make an appointment in advance. If you are unable to keep your appointment, please call us as far in advance as possible so we may use that time to see another patient in need of care. We make a sincere effort to adhere to our appointment schedule and appreciate your patience if we are late due to emergencies or hospital surgery.</p>
          </section>

          <section className="new-patients">
            <h3>NEW PATIENTS</h3>
            <p>Electronic Pre-Registration is available on our Patient Portal. The utilization of this feature will expedite your check-in process at the time of your appointment. To receive access to the Patient Portal, please call the office, and a member of our staff will assist you.</p>
            <p>If you have already completed electronic pre-registration on the Patient Portal, please arrive to your appointment five minutes early to complete the check-in process. Please bring the items listed in the side column to your appointment.</p>
            <p>If you have not completed electronic pre-registration on the Patient Portal, please arrive to your appointment thirty minutes early to complete the check-in process. Medical forms are available for download for your convenience. Please print, complete, and bring all forms to your appointment, along with the items listed.</p>
          </section>

          <section className="follow-up-patients">
            <h3>FOLLOW UP PATIENTS</h3>
            <p>We ask that you please arrive five minutes early to your scheduled appointment time to complete the check-in process. We will always do our best to accommodate our patients; however, we cannot guarantee appointments outside of your scheduled appointment time. Please bring the items listed below to every appointment.</p>
          </section>

          <section className="fees-payments">
            <h3>Fees & Payments</h3>
            <p>We make every effort to decrease the cost of your medical care. Therefore, we request payment arrangements for all office services at the time they are rendered unless prior arrangements have been made. We accept cash, checks, MasterCard, Visa, and Discover for your convenience. If we are a participating provider of your insurance company, we will bill them. However, payment is the patient’s responsibility. We will help in any way we can to assist you in handling claims.</p>
          </section>

          <section className="prescriptions-renewals">
            <h3>Prescriptions & Renewals</h3>
            <p>Effective October 6, 2014 the Drug Enforcement Agency has developed new mandates for narcotic medications.</p>
            <ul>
              <li>Narcotic medications cannot be filled or refilled over the phone, by fax, or electronically.</li>
              <li>Pharmacies will only accept hand written prescriptions signed by your provider. Therefore, all prescriptions will need to picked up in the office during office hours.</li>
              <li>Due to these new regulations, your provider will not be able to refill your narcotic medication(s) over the weekend.</li>
              <li>Our providers are dedicated to your medical treatment and recovery. Therefore, it is very important to request all narcotic medication refills timely.</li>
            </ul>
            <p>Please ask a member of the clinical staff if you have any questions regarding this information.</p>
            <p>Thank you in advance for your patience and understanding.</p>
            <div>OFFICE HOURS FOR PRESCRIPTION REFILL REQUESTS</div>
            <p>Monday–Thursday: 8:00am–4:30pm<br/>Friday: 8:00am–11:00am</p>
            <div>OFFICE HOURS FOR PRESCRIPTION PICK UP</div>
            <p>Monday–Friday: 8:00am–4:30pm</p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default AppointmentInfo;
