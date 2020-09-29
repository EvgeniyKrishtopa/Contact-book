import React from 'react';
import { Field, reduxForm, InjectedFormProps, reset } from 'redux-form';
import { IContactSendData } from 'pages/Homepage/isLoggedUser/';
import Input from '../Input';
import { validate } from 'utils';

const Form: React.FC<InjectedFormProps<IContactSendData>> = ({
  handleSubmit,
  submitting,
  pristine,
}) => {
  return (
    <form className="form-styles" onSubmit={handleSubmit}>
      <div className="input-holder">
        <label className="form-label">
          Contact Name
          <Field
            type="text"
            name="contactName"
            className="form-control"
            placeholder="Contact Name"
            component={Input}
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Contact Email
          <Field
            type="email"
            name="contactEmail"
            className="form-control"
            placeholder="ContactEmail"
            component={Input}
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Contact Phone
          <Field
            type="tel"
            name="contactPhone"
            className="form-control"
            placeholder="+380 (XX)-XXX-XX-XX"
            component={Input}
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={pristine || submitting}
        className="btn btn-primary"
      >
        Submit Contact
      </button>
    </form>
  );
};

const ContactForm = reduxForm<IContactSendData>({
  form: 'contactForm',
  validate,
  onSubmitSuccess: (_result, dispatch, _props) =>
    dispatch(reset('contactForm')),
})(Form);

export default ContactForm;
