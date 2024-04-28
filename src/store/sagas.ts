import { applicationsDefaultSaga } from '../app/layouts/ApplicationDefaults/saga';
import { usersSaga } from '../app/screens/User/saga';
import { all, fork } from 'redux-saga/effects';
// Import your sagas here
// import someSaga from './someSaga';

export default function* rootSaga() {
  // yield all([fork(usersSaga, applicationsDefaultSaga)]);
  yield all([usersSaga(), applicationsDefaultSaga()]);
}
