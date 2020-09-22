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
