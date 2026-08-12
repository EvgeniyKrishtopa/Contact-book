import React from 'react';
import { useForm } from 'react-hook-form';
import { IContactSendData } from 'views/Homepage/isLoggedUser/';
import Input from 'components/Input';
import { createValidationResolver } from 'utils';

interface IProps {
  onSubmit: (data: IContactSendData) => void;
}

const ContactForm: React.FC<IProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<IContactSendData>({
    resolver: createValidationResolver<IContactSendData>(),
  });

  const submitHandler = (data: IContactSendData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      className="form-styles"
      noValidate
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="input-holder">
        <label className="form-label">
          Contact Name
          <Input
            type="text"
            className="form-control"
            placeholder="Contact Name"
            error={errors.contactName}
            {...register('contactName')}
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Contact Email
          <Input
            type="email"
            className="form-control"
            placeholder="ContactEmail"
            error={errors.contactEmail}
            {...register('contactEmail')}
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Contact Phone
          <Input
            type="tel"
            className="form-control"
            placeholder="+380 (XX)-XXX-XX-XX"
            error={errors.contactPhone}
            {...register('contactPhone')}
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="btn btn-primary"
      >
        Submit Contact
      </button>
    </form>
  );
};

export default ContactForm;
