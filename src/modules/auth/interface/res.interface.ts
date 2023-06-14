export interface ISignInUserRes {
  userName: string;
  userId: string;
  access_token: string;
  refresh_token: string;
  [key: string]: any;
}
