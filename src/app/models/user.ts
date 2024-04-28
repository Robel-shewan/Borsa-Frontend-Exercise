import { string } from 'yup';

export interface IUserModel {
  _id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  address: string;
  profilePic?: string;
  isBuyer: boolean;
}

export interface IUserRequestModel {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  address: string;
  profilePic?: string;
  isBuyer: boolean;
}

export const userInitialValue: IUserRequestModel = {
  fullName: '',
  email: '',
  firstName: '',
  lastName: '',
  userName: '',
  address: '',
  password: '',
  confirmPassword: '',
  isBuyer: false,
  profilePic: '',
};
export interface ILogin {
  email: string;
  password: string;
}

export const userLoginInitialValue: ILogin = {
  email: '',
  password: '',
};

export type CoordinateType = {
  latitude: number;
  longitude: number;
} | null;
