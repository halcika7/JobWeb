import { Input } from '@components/UI/input/Input';

type ValidNameValues = 'name' | 'email' | 'phone' | 'subject';

interface ContactInput extends Input {
  name: ValidNameValues;
}

export const inputs: ContactInput[] = [
  {
    classNames: 'col-12',
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    classNames: 'col-12',
    label: 'Subject',
    name: 'subject',
    type: 'text',
    required: true,
  },
  {
    classNames: 'col-12',
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    classNames: 'col-12',
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    required: false,
  },
];
