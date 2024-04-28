import { IUserModel } from 'app/models/user';

/* --- STATE --- */
export interface IUserInitialState {
  user: IUserResponse;
  isLoading: boolean;
  isLogin: boolean;
  isCreateAccount: boolean;
  isUpdateSuccess: boolean;
  users: IUserModel[];
  page: number;
  hasMore: boolean;
}

export interface IUserResponse {
  _id: string;
  firstName: string;
  fullName?: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  password: string;
  confirmPassword?: string;
  profilePic?: string;
  isBuyer: boolean;
  token?: string;
}

export interface IEditProfilePayload {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IUserLoginPayload {
  email: string;
  password: string;
}

export interface IEditUserRequestParse {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IUserFilterPayload {
  page: number;
  limit: number;
}
