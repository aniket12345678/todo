import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { crudSlice } from "../slice/crud.slice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    crudSlice: crudSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);