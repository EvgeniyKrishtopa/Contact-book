export interface IError {
  message: string;
  code?: string;
  a?: null;
}

export interface IUser {
  loading: boolean;
  userData: any | null;
  error: IError | null;
  isLoginnedUser: boolean;
}

export interface IContact {
  activeStatus: boolean;
  contactEmail: string;
  contactName: string;
  contactPhone: string;
  visibility: boolean;
  id: string;
}

export interface IContacts {
  loading: boolean;
  contactsData: Array<IContact> | [];
  error: IError | null;
}
