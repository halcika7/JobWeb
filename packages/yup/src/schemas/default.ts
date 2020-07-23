import * as yup from 'yup';
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';

export const email = {
  email: yup
    .string()
    .email('Please provide valid email')
    .max(100, 'Email cannot exceed 100 characters')
    .required('Email is required'),
};

export const password = {
  password: yup
    .string()
    .min(6, 'Password must contain at least 6 characters')
    .max(15, 'Password cannot exceed 15 characters')
    .matches(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,15})'
      ),
      'Password needs to contain both lower and upper case characters, number and a special character'
    )
    .required('Password is required'),
};

export const confirmPassword = {
  password2: yup
    .string()
    .when('password', {
      is: val => val && val.length > 0,
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both password need to be the same'),
    })
    .required('Confirm password is required'),
};

export const userRegister = {
  ...password,
  ...confirmPassword,
  ...email,
  phone: yup
    .string()
    .test(
      'phone',
      'Please enter valid phone number amd include valid country code',
      value => isValidPhoneNumber(value) && isPossiblePhoneNumber(value)
    )
    .required('Phone number is required'),
  username: yup
    .string()
    .min(6, 'Username must contain at least 6 characters')
    .max(15, 'Username cannot exceed 15 characters')
    .required('Username is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
};
