import { FormikProps } from '@containers/Auth/IFormik';

export interface ActivationFormikProps extends FormikProps {
  onSubmit: (email: string) => void;
}
