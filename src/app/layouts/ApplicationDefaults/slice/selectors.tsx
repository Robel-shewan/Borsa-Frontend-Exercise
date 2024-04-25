import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state?.applicationsDefault || initialState;

export const selectAppMessage = createSelector(
  [selectSlice],
  state => state.appMessage,
);
