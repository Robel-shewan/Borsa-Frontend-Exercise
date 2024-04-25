import { PayloadAction } from '@reduxjs/toolkit';

import { userActions as actions } from '.';

import routes from '../../../API/api.routes';
import makeCall from '../../../API/makeCalls';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IUserResponse } from './types';
import { IUserModel, IUserRequestModel } from 'app/models/user';
import { applicationsDefaultActions } from '../../../layouts/ApplicationDefaults/slice';

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
      yield put(actions.addUser(response as IUserModel));
    } else {
      yield put(actions.iscreateAccount(false));
    }
  } catch (error) {
    yield put(
      applicationsDefaultActions.setAppMessage({
        message: error.message,
        severity: 'success',
        goBackOnDismiss: true,
      }),
    );
    console.log('error', error);
  }
}

function* loginUserSaga(
  action: PayloadAction<{ email: string; passowrd: string }>,
) {
  try {
    const requestBody = action.payload;

    const response: IUserResponse = yield call(makeCall, {
      method: 'POST',
      isSecureRoute: false,
      route: `${routes.user.login}`,
      body: requestBody,
    });

    if (response) {
      yield put(actions.isLoginUser(true));
    }
  } catch (error) {
    yield put(actions.isLoginUser(true));
    yield put(
      applicationsDefaultActions.setAppMessage({
        message: error?.message,
        severity: 'success',
        goBackOnDismiss: true,
      }),
    );
    console.log('error', error);
  }
}

export function* usersSaga() {
  yield takeLatest('user/addUser', createUserSaga);
  yield takeLatest('user/loginUser', loginUserSaga);
}
