import {Middleware, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import {storage} from '../services/storage';
import {dashboardReducer, loginReducer} from './slice';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userData'],
};

const rootReducer = combineReducers({
  userData: loginReducer,
  dashboardData: dashboardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares: Middleware[] = [];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 1200,
      },
      immutableCheck: false,
    }).concat(middlewares),
});

export type RootState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
