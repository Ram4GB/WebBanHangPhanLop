import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Routes from "./Routes";
import CustomModal from "../components/shared/CustomModal";
import { ConfigProvider, notification } from "antd";
import { useSelector } from "react-redux";
import { IRootState } from "../../modules";

declare global {
  interface Window {
    Modal: any;
  }
}

notification.config({
  placement: "bottomRight",
  bottom: 50,
  duration: 3,
});

export default function MainPage() {
  const lang = useSelector((state: IRootState) => state.user.lang);

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={{
          locale: lang,
        }}
        componentSize="middle"
      >
        <MainLayout>
          <Routes />
          <CustomModal
            ref={(ref) => {
              window.Modal = ref;
            }}
          />
        </MainLayout>
      </ConfigProvider>
    </BrowserRouter>
  );
}
