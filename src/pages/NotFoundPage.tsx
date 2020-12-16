import { Button, Result } from "antd";
import React from "react";
import { useHistory } from "react-router";

export default function NotFoundPage() {
  const history = useHistory();

  return (
    <div
      style={{
        fontSize: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn tìm không có"
        extra={
          <Button onClick={() => history.push("/")} type="primary">
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
}
