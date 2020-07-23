import * as yup from 'yup';
import { password, email, userRegister, confirmPassword } from './default';

export const UserRegiter = yup.object().shape({ ...userRegister });

export const CompanySchema = yup.object().shape({
  ...userRegister,
  website: yup.string().test('website', 'Enter valid website url', value => {
    if (!value) return true;

    return yup.string().url().isValidSync(value);
  }),
  company: yup.string().required('Company name is required'),
});

export const UserLogin = yup.object().shape({
  username: yup.string().required('Username is required'),
  ...password,
});

export const EmailSchema = yup.object().shape({ ...email });

export const PasswordSchema = yup.object().shape({
  ...password,
  ...confirmPassword,
});
