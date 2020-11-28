import React from "react";
import { Provider } from "react-redux";
import MainPage from "./MainPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

interface IProps {
  store: any;
}

export default function Root(props: IProps) {
  const { store } = props;
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainPage></MainPage>
      </PersistGate>
    </Provider>
  );
}
