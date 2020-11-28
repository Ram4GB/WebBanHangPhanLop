import { Button, Card, Form, Input, notification, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { largeFontSizeTitle, maxWidthForm } from "../common/config";
import handleError from "../common/utils/handleError";
import { loginAction } from "../modules/users/reducers";

export default function AboutMe() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (value: any) => {
    // gọi api login
    try {
      dispatch(loginAction(value));
      notification.success({
        message: "Đăng nhập thành công",
      });
      history.push("/");
    } catch (error) {
      handleError(error, null, notification);
    }
  };

  return (
    <div className="container-fluid">
      <Card
        title={
          <Typography.Title level={largeFontSizeTitle}>
            Đăng nhập
          </Typography.Title>
        }
      >
        <Form onFinish={handleLogin} style={{ maxWidth: maxWidthForm }}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Mời điền username" }]}
          >
            <Input placeholder="Mời điền username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Mời điền password" }]}
          >
            <Input.Password placeholder="Mời điền password" />
          </Form.Item>
          <div>
            <Button htmlType="submit" type="primary">
              Đăng nhập
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
