export type RegisterData = {
  username: string;
  email: string;
  password: string;
  password2: string;
  phone: string;
  country: string;
  city: string;
  website?: string;
  company?: string;
};

export type LoginData = {
  username: string;
  password: string;
};

const stringLitArray = <T extends string>(arr: T[]) => arr;

export const accountTypes = stringLitArray(['user', 'company']);

export type AccountType = typeof accountTypes[number];

export const isValidAccountType = (x: any): x is AccountType =>
  accountTypes.includes(x);

export interface RegisterPostData {
  userData: RegisterData | {};
  accountType: AccountType;
}

export interface Token {
  id: number;
  role: { id: number; type: string };
}
