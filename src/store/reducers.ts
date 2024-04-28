import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../app/screens/User/slice';
import applicationsDefaultReducer from '../app/layouts/ApplicationDefaults/slice/index';

/**
 * Combine all reducers in this file and export the combined reducers.
 */

const rootReducer = combineReducers({
  user: userReducer,
  applicationsDefault: applicationsDefaultReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
