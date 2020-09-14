import React from 'react';

const ContactForm = () => {
  return (
    <form className="form-styles">
      <div className="input-holder">
        <label className="form-label">
          Contact Name
          <input
            type="email"
            className="form-control"
            placeholder="Contact Name"
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Contact Email
          <input
            type="email"
            className="form-control"
            placeholder="ContactEmail"
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Contact Phone
          <input
            type="tel"
            className="form-control"
            placeholder="Contact Phone"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Contact
      </button>
    </form>
  );
};

export default ContactForm;
