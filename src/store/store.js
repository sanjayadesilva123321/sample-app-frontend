import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import reducerTypes from './reducerTypes';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: [reducerTypes.user],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const options = {
  reducer: persistedReducer,
  middleware: [thunk],
};

const store = configureStore(options);

export const persistor = persistStore(store);

export default store;
