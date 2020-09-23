export type IError = {
  message: string;
  code?: string;
  a?: null;
};

export interface IUser {
  loading: boolean;
  userData: any | null;
  error: IError | null;
  isLoginnedUser: boolean;
}

export interface IContact {
  email: string;
  name: string;
  phone: string;
  status: boolean;
}
export interface IContacts {
  loading: boolean;
  contactsData: Array<IContact> | null;
  error: IError | null;
}