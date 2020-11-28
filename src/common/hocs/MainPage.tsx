import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Routes from "./Routes";
import CustomModal from "../components/shared/CustomModal";

declare global {
  interface Window {
    Modal: any;
  }
}

export default function MainPage() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes />
        <CustomModal
          ref={(ref) => {
            window.Modal = ref;
          }}
        />
      </MainLayout>
    </BrowserRouter>
  );
}
