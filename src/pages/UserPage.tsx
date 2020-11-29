import { Button, Card, Input, Typography } from "antd";
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import UserContainer from "../common/components/shared/UserContainer";

export default function UserPage() {
  const [form] = useForm();
  return (
    <UserContainer>
      <Card title={<Typography.Title>Thông tin cá nhân</Typography.Title>}>
        <Form style={{ maxWidth: 600 }} form={form}>
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
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </Card>
    </UserContainer>
  );
}
