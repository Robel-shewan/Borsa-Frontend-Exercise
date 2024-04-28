/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../utils/redux-injectors';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../../utils/@reduxjs/toolkit';
import {
  IEditProfilePayload,
  IUserFilterPayload,
  IUserInitialState,
  IUserResponse,
} from './types';
import { IUserModel, IUserRequestModel } from 'app/models/user';

export const initialState: IUserInitialState = {
  isLoading: false,
  isCreateAccount: false,
  isUpdateSuccess: false,
  isLogin: false,
  page: 1,
  hasMore: true,
  user: {
    _id: '',
    address: '',
    email: '',
    firstName: '',
    lastName: '',
    isBuyer: false,
    userName: '',
    password: '',
    profilePic: '',
  },
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<IUserRequestModel>) {
      state.isLoading = true;
    },
    setIsCreateAccount(state, action: PayloadAction<boolean>) {
      state.isCreateAccount = action.payload;
    },
    setUser(state, action: PayloadAction<IUserModel>) {
      state.user = action.payload;
    },
    loginUser(
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) {
      state.isLogin = true;
    },
    setIsSigningIn(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    updateUser(state, action: PayloadAction<IEditProfilePayload>) {
      state.isLoading = true;
    },
    setIsUpdateSuccess(state, action: PayloadAction<boolean>) {
      state.isUpdateSuccess = true;
    },

    getUser(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
    getAllUsers(state, action: PayloadAction<IUserFilterPayload>) {
      state.isLoading = true;
    },
    setAllUsers(state, action: PayloadAction<IUserModel[]>) {
      state.users = [...state.users, ...action.payload];
      state.page = state.page + 1;
      state.hasMore = action.payload.length > 0;
      state.isLoading = false;
    },
    fetchFailure(state, action) {
      state.isLoading = false;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
