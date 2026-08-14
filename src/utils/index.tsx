import type { FieldValues, FieldErrors, Resolver } from 'react-hook-form';

interface Values {
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  userLogin?: string | null;
  userEmail?: string | null;
  userPassword?: string | null;
}

interface Errors {
  userLogin?: string;
  userEmail?: string;
  userPassword?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export const validate = (values: Values): Errors => {
  const errors: Errors = {};
  if (!values.contactName) {
    errors.contactName = 'This field is required!';
  } else if (values.contactName.length > 15) {
    errors.contactName = 'Must be 15 characters or less';
  }
  if (!values.contactEmail) {
    errors.contactEmail = 'This field is required!';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactEmail)
  ) {
    errors.contactEmail = 'Invalid email address!';
  }

  if (!values.contactPhone) {
    errors.contactPhone = 'This field is required!';
  } else if (
    !/^\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/i.test(values.contactPhone)
  ) {
    errors.contactPhone = 'Invalid phone number!';
  }

  if (!values.userLogin) {
    errors.userLogin = 'This field is required!';
  } else if (values.userLogin.length > 15) {
    errors.userLogin = 'Must be 15 characters or less';
  }
  if (!values.userEmail) {
    errors.userEmail = 'This field is required!';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userEmail)
  ) {
    errors.userEmail = 'Invalid email address!';
  }

  if (!values.userPassword) {
    errors.userPassword = 'This field is required!';
  } else if (values.userPassword.length < 6) {
    errors.userPassword = 'Must be 6 characters or more';
  }
  return errors;
};

// Wraps the framework-agnostic `validate` above as a react-hook-form
// resolver. Only registered fields (present as keys in `values`) are kept,
// so a shared validator can cover multiple forms without an unregistered
// field (e.g. userLogin on the login form) blocking submission.
export const createValidationResolver =
  <TFieldValues extends FieldValues>(): Resolver<TFieldValues> =>
  async values => {
    const validationErrors = validate(values) as Record<string, string>;
    const errors = Object.keys(validationErrors).reduce<
      FieldErrors<TFieldValues>
    >((acc, key) => {
      if (key in values) {
        acc[key as keyof TFieldValues] = {
          type: 'validate',
          message: validationErrors[key],
        } as FieldErrors<TFieldValues>[keyof TFieldValues];
      }
      return acc;
    }, {});

    if (Object.keys(errors).length) {
      return { values: {}, errors };
    }
    return { values: values as TFieldValues, errors: {} };
  };
