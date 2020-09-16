import React from 'react';
import { Field, reduxForm } from 'redux-form';

const Form = () => {
  return (
    <form className="form-styles">
      <div className="input-holder">
        <label className="form-label">
          Contact Name
          <Field
            type="text"
            name="name"
            className="form-control"
            placeholder="Contact Name"
            component="input"
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Contact Email
          <Field
            type="email"
            name="email"
            className="form-control"
            placeholder="ContactEmail"
            component="input"
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Contact Phone
          <Field
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Contact Phone"
            component="input"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Contact
      </button>
    </form>
  );
};

const ContactForm = reduxForm({
  form: 'contactForm',
})(Form);

export default ContactForm;
