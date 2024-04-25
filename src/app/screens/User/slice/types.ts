/* --- STATE --- */
export interface IUserInitialState {
  user: IUserResponse;
  isLoading: boolean;
  isLogin: boolean;
  isCreateAccount: boolean;
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
}
