export type IError = {
  message: string;
  [propsName: string]: any;
};

export interface IUser {
  loading: boolean;
  userData: any | null;
  error: IError | null | string;
  isLoginnedUser: boolean;
}
