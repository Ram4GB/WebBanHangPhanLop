import { Button, Card, Input, notification, Typography } from "antd";
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import UserContainer from "../common/components/shared/UserContainer";
import { maxWidthForm, roleName } from "../common/config";
import handleError from "../common/utils/handleError";
import { IRootState } from "../modules";
import { getUserProfile, updateUser } from "../modules/users/services";

export default function UserPage() {
  const [form] = useForm();
  const userID = useSelector((state: IRootState) => state.user.account?.id);

  const getData = useCallback(async () => {
    try {
      if (userID) {
        let result = await getUserProfile(userID);
        if (result.status === 200) {
          form.setFieldsValue(result.data.data);
        }
      }
    } catch (error) {
      console.log(error);
      handleError(error, null, notification);
    }
  }, [form, userID]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleUpdateUser = async (values: any) => {
    try {
      if (userID) {
        delete values.email;
        let result = await updateUser(
          { ...values, roleName: roleName },
          userID
        );
        if (result.status === 200) {
          notification.success({
            message: "Chỉnh sửa thành công",
          });
        }
      }
    } catch (error) {
      handleError(error, null, notification);
    }
  };

  return (
    <UserContainer>
      <Card title={<Typography.Title>Thông tin cá nhân</Typography.Title>}>
        <Form
          onFinish={handleUpdateUser}
          style={{ maxWidth: maxWidthForm }}
          form={form}
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
            <Input disabled placeholder="Mời điền email" />
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
