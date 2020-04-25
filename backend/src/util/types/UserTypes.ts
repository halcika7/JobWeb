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

export type AccountType = 'user' | 'company';

export interface RegisterPostData {
  userData: RegisterData;
  accountType: AccountType;
}

export interface Token {
  id: number;
  role: { id: number; type: string };
}
