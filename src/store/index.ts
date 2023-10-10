import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useDispatch } from "react-redux";
import { getUserByAccessTokenThunk } from "./quanLyNguoiDung";

export const store = configureStore({
  reducer: rootReducer,
});
// dispatch action khi client vào trang web
store.dispatch(getUserByAccessTokenThunk());

type AppDispatch = (typeof store)["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<(typeof store)["getState"]>;
