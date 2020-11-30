import { Button, Card, Form, Input, notification, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { largeFontSizeTitle, maxWidthForm, roleName } from "../common/config";
import handleError from "../common/utils/handleError";
import { registerUser } from "../modules/users/services";

// "fullName": "string",
// "address": "string",
// "phoneNumber": "string",
// "email": "string",
// "password": "string",
// "roleName": "string"

export default function Regsiter() {
  const [form] = useForm();

  const handleRegister = async (value: any) => {
    // gọi api login
    try {
      delete value.prePassword;
      let result = await registerUser({ ...value, roleName: roleName });
      if (result.status === 201) {
        notification.success({
          message: "Tạo tài khoản thành công",
        });
      }
      window.Modal.hide();
    } catch (error) {
      handleError(error, null, notification);
    }
  };

  return (
    <div className="container-fluid">
      <Card
        title={
          <Typography.Title level={largeFontSizeTitle}>
            Tạo tài khoản
          </Typography.Title>
        }
      >
        <Form
          form={form}
          onFinish={handleRegister}
          style={{ maxWidth: maxWidthForm }}
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Mời điền tên đầy đủ" }]}
          >
            <Input placeholder="Mời điền tên đầy đủ" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: "Mời điền số điện thoại" }]}
          >
            <Input placeholder="Mời điền số điện thoại" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Mời điền email" },
              { type: "email", message: "Mời điền đúng định dạng email" },
            ]}
          >
            <Input placeholder="Mời điền email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Mời điền password" }]}
          >
            <Input.Password placeholder="Mời điền password" />
          </Form.Item>
          <Form.Item
            name="prePassword"
            rules={[
              { required: true, message: "Mời điền password lại" },
              {
                validator: (rules, value, cb) => {
                  if (value === form.getFieldValue("password")) {
                    cb();
                  } else {
                    cb("Hai mật khẩu không trùng");
                  }
                },
              },
            ]}
          >
            <Input.Password placeholder="Mời điền password lại" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ message: "Mời nhập địa chỉ", required: true }]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <div>
            <Button htmlType="submit" type="primary">
              Đăng ký
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
