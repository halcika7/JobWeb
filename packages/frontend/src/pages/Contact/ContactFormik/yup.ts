import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import * as yup from 'yup';

export const ContactSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, 'Name must contain at least 1 character')
    .max(150, 'Name cannot exceed 150 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please provide valid email')
    .max(100, 'Email cannot exceed 100 characters')
    .required('Email is required'),
  subject: yup
    .string()
    .min(1, 'Subject must contain at least 1 character')
    .max(150, 'Subject cannot exceed 150 characters')
    .required('Subject is required'),
  message: yup
    .string()
    .min(10, 'Message must contain at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters')
    .required('Message is required'),
  phone: yup.string().test('phone', 'Enter valid Phone number', value => {
    if (!value) return true;

    return isValidPhoneNumber(value) && isPossiblePhoneNumber(value);
  }),
});
