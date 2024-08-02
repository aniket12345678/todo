import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { crudSlice } from "../slice/crud.slice";

const rootReducer = combineReducers({
    crudSlice: crudSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});