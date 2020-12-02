import { Button, Card, Form, Input, notification, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useDispatch } from "react-redux";
import { largeFontSizeTitle, maxWidthForm } from "../common/config";
import handleError from "../common/utils/handleError";
import { loginAction } from "../modules/users/reducers";
import { login } from "../modules/users/services";

export default function Login() {
  const dispatch = useDispatch();
  const [form] = useForm();

  const handleLogin = async (value: any) => {
    // gọi api login
    try {
      let result = await login(value);
      if (result.status === 200) {
        notification.success({
          message: "Đăng nhập thành công",
        });
        dispatch(loginAction(result.data.data));
      }
      window.Modal.hide();
    } catch (error) {
      handleError(error, form, notification);
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
        <Form
          form={form}
          onFinish={handleLogin}
          style={{ maxWidth: maxWidthForm }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Mời điền email" }]}
          >
            <Input placeholder="Mời điền email" />
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
