/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../../utils/@reduxjs/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../utils/redux-injectors';
import { applicationsDefaultSaga } from './saga';
import { ApplicationsDefaultState, IAppMessageConfig } from './types';

export const initialState: ApplicationsDefaultState = {
  appMessage: undefined,
};

const slice = createSlice({
  name: 'applicationsDefault',
  initialState,
  reducers: {
    setAppMessage(state, action: PayloadAction<IAppMessageConfig>) {
      state.appMessage = action.payload;
    },
    hideAppMessage(state) {
      state.appMessage = undefined;
    },
  },
});

export const { actions: applicationsDefaultActions } = slice;

export const useApplicationsDefaultSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: applicationsDefaultSaga });
  return { actions: slice.actions };
};
