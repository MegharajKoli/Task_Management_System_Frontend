import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlices';
import taskReducer from './taskSlice';
import userReducer from './userSlice';
import commentReducer from './commentSlice';
import dashboardReducer from './dashboardSlice';
import { useDispatch, useSelector} from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: taskReducer,
    users:userReducer,
    comments : commentReducer,
    dashboard : dashboardReducer,
  },
  preloadedState: {
    theme: { mode: getInitialTheme() },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;