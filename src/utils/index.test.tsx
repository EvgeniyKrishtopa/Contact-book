import { validate } from './index';

test('flags all required fields as missing when empty', () => {
  const errors = validate({});
  expect(errors.contactName).toBe('This field is required!');
  expect(errors.contactEmail).toBe('This field is required!');
  expect(errors.contactPhone).toBe('This field is required!');
  expect(errors.userLogin).toBe('This field is required!');
  expect(errors.userEmail).toBe('This field is required!');
  expect(errors.userPassword).toBe('This field is required!');
});

test('rejects an invalid email address', () => {
  const errors = validate({ userEmail: 'not-an-email' });
  expect(errors.userEmail).toBe('Invalid email address!');
});

test('rejects a password shorter than 6 characters', () => {
  const errors = validate({ userPassword: '123' });
  expect(errors.userPassword).toBe('Must be 6 characters or more');
});

test('rejects a contact phone that does not match the expected format', () => {
  const errors = validate({ contactPhone: '123-456' });
  expect(errors.contactPhone).toBe('Invalid phone number!');
});

test('accepts a fully valid set of values with no errors', () => {
  const errors = validate({
    contactName: 'Jane',
    contactEmail: 'jane@example.com',
    contactPhone: '+380 (11)-111-11-11',
    userLogin: 'jane',
    userEmail: 'jane@example.com',
    userPassword: 'secret1',
  });
  expect(errors).toEqual({});
});
