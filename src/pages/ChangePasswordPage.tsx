import { Button, Card, Form, Input, notification, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useSelector } from "react-redux";
import UserContainer from "../common/components/shared/UserContainer";
import { largeFontSizeTitle, maxWidthForm } from "../common/config";
import handleError from "../common/utils/handleError";
import { IRootState } from "../modules";
import { updateUserPassword } from "../modules/users/services";

export default function ChangePasswordPage() {
  const [form] = useForm();
  const userID = useSelector((state: IRootState) => state.user.account?.id);

  const handleUpdatePassword = async (value: any) => {
    try {
      if (userID) {
        delete value.prePassword;
        let result = await updateUserPassword(
          {
            oldPassword: value.oldPassword,
            newPassword: value.newPassword,
          },
          userID
        );
        if (result.status === 200) {
          notification.success({
            message: "Cập nhật thành công",
          });
          form.resetFields();
        }
      }
    } catch (error) {
      handleError(error, form, notification);
    }
  };

  return (
    <UserContainer>
      <Card
        title={
          <Typography.Title level={largeFontSizeTitle}>
            Đổi mật khẩu
          </Typography.Title>
        }
      >
        <Form
          style={{ maxWidth: maxWidthForm }}
          layout="vertical"
          onFinish={handleUpdatePassword}
          form={form}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              {
                message: "Mời nhập password",
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="Nhập password" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="newPassword"
            rules={[
              {
                message: "Mời nhập password",
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="Nhập password" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                message: "Mời nhập lại password",
                required: true,
              },
              {
                validator: (rules, value, cb) => {
                  if (value !== form.getFieldValue("newPassword")) {
                    cb("Hai mật khẩu không trùng nhau");
                  } else {
                    cb();
                  }
                },
              },
            ]}
            label="Nhập lại mật khẩu"
            name="prePassword"
          >
            <Input.Password placeholder="Nhập lại password" />
          </Form.Item>
          <div>
            <Button htmlType="submit" type="primary">
              Cập nhật
            </Button>
          </div>
        </Form>
      </Card>
    </UserContainer>
  );
}
