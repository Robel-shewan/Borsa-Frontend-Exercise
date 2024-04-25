/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../utils/redux-injectors';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../../utils/@reduxjs/toolkit';
import { usersSaga } from './saga';
import { IUserInitialState, IUserResponse } from './types';
import { IUserModel, IUserRequestModel } from 'app/models/user';

export const initialState: IUserInitialState = {
  isLoading: false,
  isCreateAccount: false,
  isLogin: false,
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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUserRequestModel>) {
      state.isLoading = true;
    },
    loginUser(
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) {
      state.isLogin = true;
    },
    isLoginUser(state, action: PayloadAction<boolean>) {
      state.isLogin = true;
    },
    iscreateAccount(state, action: PayloadAction<boolean>) {
      state.isCreateAccount = true;
    },
  },
});

export const { actions: userActions } = userSlice;

export const useUsersSlice = () => {
  useInjectReducer({ key: userSlice.name, reducer: userSlice.reducer });
  useInjectSaga({ key: userSlice.name, saga: usersSaga });
  return { actions: userSlice.actions };
};
