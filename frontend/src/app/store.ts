import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import articleReducer from "../features/article/articleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
