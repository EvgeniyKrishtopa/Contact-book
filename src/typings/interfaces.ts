export interface User {
  loading: boolean;
  userData: object | null;
  error: object | null | string;
  isLoginnedUser: boolean;
}
