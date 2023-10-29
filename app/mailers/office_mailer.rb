class OfficeMailer < ApplicationMailer
    default from: 'unitymskwebsites@gmail.com' # Set your default sender email address
  
    def contact_us_email(form_data)
      @form_data = form_data # Make the form data accessible in the email view template
      mail(to: 'unitymskwebsites@gmail.com', subject: 'New Contact Form Submission')
    end

    def request_appointment_form(form_data)
      @form_data = form_data # Make the form data accessible in the email view template
      mail(to: 'unitymskwebsites@gmail.com', subject: 'New Request Appointment Form Submission')
    end
  end
  