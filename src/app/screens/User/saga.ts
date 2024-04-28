import { PayloadAction } from '@reduxjs/toolkit';

import { actions } from './slice';

import routes from '../../API/api.routes';
import makeCall from '../../API/makeCalls';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  IEditProfilePayload,
  IUserFilterPayload,
  IUserLoginPayload,
  IUserResponse,
} from './slice/types';
import { IUserModel, IUserRequestModel } from 'app/models/user';
import { setAppMessage } from '../../layouts/ApplicationDefaults/slice';

/**
 * createUserSaga is a generator function responsible for handling the asynchronous creation of a user account.
 * It takes a PayloadAction containing user data as input and performs a POST request to create the user account.
 * Upon successful creation of the account, it updates the user state with the response data, sets the flag indicating
 * that the account creation is successful, and displays a success message to the user.
 * If the account creation fails, it sets the flag indicating the failure, displays an error message, and logs the error.
 * @param action PayloadAction<IUserModel> The action containing user data for account creation
 */

function* createUserSaga(action: PayloadAction<IUserModel>) {
  try {
    const requestBody = action.payload;

    const response: IUserModel = yield call(makeCall, {
      method: 'POST',
      isSecureRoute: false,
      route: `${routes.user.createAccount}`,
      body: requestBody,
    });

    if (response) {
      yield put(actions.setUser(response));
      yield put(actions.setIsCreateAccount(true));
      yield put(
        setAppMessage({
          message: `Welcome  ${response?.firstName} ${response.lastName}`,
          severity: 'success',
          dismissText: 'Continue',
        }),
      );
    } else {
      yield put(actions.setIsCreateAccount(false));
    }
  } catch (error: any) {
    yield put(actions.setIsCreateAccount(false));
    const message =
      error?.message || 'An unknown error occured while Create Account';
    yield put(
      setAppMessage({
        message,
        severity: 'error',
        dismissText: 'Try Again',
      }),
    );
    console.log('error', error);
  }
}
/**
 * loginUserSaga is a generator function responsible for handling the asynchronous login process of a user.
 * It takes a PayloadAction containing user login data as input and performs a POST request to log in the user.
 * Upon successful login, it updates the user state with the response data, sets the flag indicating
 * that the user is signing in, and displays a success message to the user.
 * If the login fails, it displays an error message, sets the flag indicating the failure, and logs the error.
 * @param action PayloadAction<IUserLoginPayload> The action containing user login data
 */
function* loginUserSaga(action: PayloadAction<IUserLoginPayload>) {
  try {
    const requestBody = action.payload;

    const user: IUserModel = yield call(makeCall, {
      method: 'POST',
      isSecureRoute: false,
      route: `${routes.user.login}`,
      body: requestBody,
    });

    if (user) {
      yield put(actions.setUser(user));
      yield put(actions.setIsSigningIn(true));
      yield put(
        setAppMessage({
          message: `Welcome back ${user?.firstName} ${user.lastName}`,
          severity: 'success',
          dismissText: 'Continue',
        }),
      );
    }
  } catch (error: any) {
    // yield put(isLoginUser(true));
    const message =
      error?.message || 'An unknown error occured while signing you in';
    yield put(
      setAppMessage({
        message,
        severity: 'error',
        dismissText: 'Try Again',
      }),
    );
    yield put(actions.setIsSigningIn(false));
    console.log('error', error);
  }
}
/**
 * EditUserProfileSaga is a generator function responsible for handling the asynchronous process of editing a user profile.
 * It takes a PayloadAction containing the edited profile data as input and performs a PUT request to update the user's profile.
 * Upon successful profile update, it sets the flag indicating the success, and displays a success message to the user.
 * If the profile update fails, it displays an error message and logs the error.
 * @param action PayloadAction<IEditProfilePayload> The action containing the edited profile data
 */
function* EditUserProfileSaga(action: PayloadAction<IEditProfilePayload>) {
  try {
    const { _id, ...requestBody } = action.payload;

    const user: IUserModel = yield call(makeCall, {
      method: 'PUT',
      isSecureRoute: false,
      route: `${routes.user.updateUser}`,
      body: requestBody,
      query: { id: _id },
    });

    if (user) {
      yield put(actions.setIsUpdateSuccess(true));
      yield put(
        setAppMessage({
          message: `Update Profile SuccessFully`,
          severity: 'success',
          dismissText: 'Continue',
        }),
      );
    }
  } catch (error: any) {
    const message = error?.message;
    yield put(
      setAppMessage({
        message,
        severity: 'error',
        dismissText: 'Update Try Again',
      }),
    );
    console.log('error', error);
  }
}

function* getUserProfileSaga(action: PayloadAction<string>) {
  try {
    const _id = action.payload;

    const user: IUserModel = yield call(makeCall, {
      method: 'GET',
      isSecureRoute: true,
      route: `${routes.user.getUser}/${_id}`,
    });

    if (user) {
      yield put(actions.setUser(user));
    }
  } catch (error: any) {
    console.log('error', error);
  }
}
/**
 * getUsersSaga is a generator function responsible for fetching users from the server based on the provided filters (page and limit).
 * It takes a PayloadAction containing the user filter payload as input and performs a GET request to retrieve users.
 * Upon successful retrieval of users, it sets the fetched users in the Redux store.
 * If an error occurs during the process, it sets the loading state to false.
 * @param action PayloadAction<IUserFilterPayload> The action containing the user filter payload (page and limit)
 */
function* getUsersSaga(action: PayloadAction<IUserFilterPayload>) {
  try {
    const { page, limit } = action.payload;

    const users: { data: IUserModel[] } = yield call(makeCall, {
      method: 'GET',
      isSecureRoute: true,
      route: `${routes.user.getAllUsers}`,
      query: { page, limit },
    });

    if (users) {
      yield put(actions.setAllUsers(users?.data));
    }
  } catch (error: any) {
    yield put(actions.setIsLoading(false));
  }
}

export function* usersSaga() {
  yield takeLatest(actions.createUser.type, createUserSaga);
  yield takeLatest(actions.loginUser.type, loginUserSaga);
  yield takeLatest(actions.updateUser.type, EditUserProfileSaga);
  yield takeLatest(actions.getUser.type, getUserProfileSaga);
  yield takeLatest(actions.getAllUsers.type, getUsersSaga);
}
