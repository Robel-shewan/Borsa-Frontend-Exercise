import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state?.user || initialState;

export const selectUser = createSelector([selectSlice], state => state.user);
export const selectIsLogin = createSelector(
  [selectSlice],
  state => state.isLogin,
);

export const selectIsUpdateSuccess = createSelector(
  [selectSlice],
  state => state.isUpdateSuccess,
);
export const selectAllUsers = createSelector(
  [selectSlice],
  state => state.users,
);

export const selectIsLoading = createSelector(
  [selectSlice],
  state => state.isLoading,
);

export const selectHasMore = createSelector(
  [selectSlice],
  state => state.hasMore,
);
export const selectPage = createSelector([selectSlice], state => state.page);

export const selectIscreateAccount = createSelector(
  [selectSlice],
  state => state.isCreateAccount,
);
// export const isLogin = createSelector([selectSlice], state => state.isLogin);
