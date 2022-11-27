import { configureStore } from '@reduxjs/toolkit';
import documentReducer from './document-reducer';

const store = configureStore({ reducer: documentReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
