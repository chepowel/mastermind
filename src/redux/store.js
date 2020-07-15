import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux';

// https://github.com/rt2zz/redux-persist
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['game']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunkMiddleware];
middleware.push(loggerMiddleware);

export const store = createStore(persistedReducer, composeWithDevTools(
  applyMiddleware(...middleware),
));
export const persistor = persistStore(store);