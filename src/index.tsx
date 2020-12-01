import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./modules/index";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Root from "./common/hocs/Root";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./common/assets/less/index.less";
import "./common/assets/less/mobile.less";
import { PERSIST, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST],
    },
  }),
});

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
