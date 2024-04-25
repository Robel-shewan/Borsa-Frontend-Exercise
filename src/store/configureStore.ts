/**
 * Create the store with dynamic reducers
 */

import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
//@ts-ignore
import { promiseMiddleware } from '@adobe/redux-saga-promise';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware();
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [promiseMiddleware, sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer(),
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({ serializableCheck: false }),
      ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  return store;
}
