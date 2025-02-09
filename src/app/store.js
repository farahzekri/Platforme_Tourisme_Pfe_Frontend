import {configureStore} from "@reduxjs/toolkit"
import {apiSlice} from './api/apiSlice'
import authReducer from '../ApiSlice/authSlice'
import { persistReducer,persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"; // Import du storage pour persister l'état
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, 
      }).concat(apiSlice.middleware),
    devTools: true,
  })

  export const persistor = persistStore(store);