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
