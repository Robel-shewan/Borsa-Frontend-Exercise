/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../../utils/@reduxjs/toolkit';

import { ApplicationsDefaultState, IAppMessageConfig } from './types';

export const initialState: ApplicationsDefaultState = {
  appMessage: undefined,
};

const sliceDefaultLayout = createSlice({
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

export const { hideAppMessage, setAppMessage } = sliceDefaultLayout.actions;

export default sliceDefaultLayout.reducer;
