// types
import { ContactMessageTouched } from '../store/reducer';
import { ContactMessage } from '../store/types';

import { Input } from '@components/UI/input/Input';

type ValidNameValues = 'name' | 'email' | 'phone' | 'subject';

interface ContactInput extends Input {
  name: ValidNameValues;
}

export const inputs: ContactInput[] = [
  {
    classNames: 'col-12 col-md-6',
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    classNames: 'col-12 col-md-6',
    label: 'Subject',
    name: 'subject',
    type: 'text',
    required: true,
  },
  {
    classNames: 'col-12 col-md-6',
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    classNames: 'col-12 col-md-6',
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    required: false,
  },
];

export interface Props {
  status: number | null;
  disabled: boolean;
  errors: ContactMessage;
  values: ContactMessage;
  touched: ContactMessageTouched;
  postNewMessage: (messageData: ContactMessage) => void;
}
