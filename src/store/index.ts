import { configureStore } from '@reduxjs/toolkit';
import activityLogReducer from './slices/activityLogSlice';

const store = configureStore({
  reducer: activityLogReducer,
});

export default store;
