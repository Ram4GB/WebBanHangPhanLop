import { Button, Form, Input, notification, Radio, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../modules";
import { createOrder } from "../../../modules/users/services";
import { regularFontSizeTitle } from "../../config";
import handleError from "../../utils/handleError";
import NumberFormat from "./NumberFormat";
import { clearCart } from "../../../modules/users/reducers";

interface IProps {
  cost: number;
}

CheckoutForm.defaultProps = {
  cost: 0,
  data: null,
};

export default function CheckoutForm(props: IProps) {
  const [isUseCurrentAddress, setIsUseCurrentAddress] = useState(true);
  const carts = useSelector((state: IRootState) => state.user.carts);
  const userID = useSelector((state: IRootState) => state.user.account?.id);
  const comboCarts = useSelector((state: IRootState) => state.user.comboCarts);
  const [form] = useForm();
  const address = useSelector(
    (state: IRootState) => state.user.account?.address
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!address) {
      setIsUseCurrentAddress(false);
    }
  }, [address]);

  const handleSubmit = async (values: any) => {
    if (comboCarts.length === 0 && carts.length === 0) {
      notification.info({
        message: "Bạn chưa có gì trong giỏ hàng",
      });
      return -1;
    }
    // tạo dữ liệu gửi cho server

    let data: any = {
      totalPrice: 0,
      deliveryAddress: "",
      customerId: 0,
      orderDetails: [],
    };
    data.totalPrice = props.cost;
    if (isUseCurrentAddress) {
      data.deliveryAddress = address;
    } else {
      data.deliveryAddress = values.deliveryAddress;
    }
    data.customerId = userID;

    let orderDetails = [];
    for (let index = 0; index < carts.length; index++) {
      orderDetails.push({
        amount: carts[index].amount,
        totalPrice: carts[index].amount * carts[index].price,
        productId: carts[index].id,
        comboId: null,
      });
    }

    for (let index = 0; index < comboCarts.length; index++) {
      orderDetails.push({
        amount: comboCarts[index].amount,
        totalPrice: comboCarts[index].amount * comboCarts[index].price,
        productId: null,
        comboId: comboCarts[index].id,
      });
    }
    data.orderDetails = orderDetails;

    try {
      let result = await createOrder(data);
      if (result.status === 201) {
        notification.success({
          message: "Tạo đơn hàng thành công",
        });
        dispatch(clearCart());
        window.Modal.hide();
      }
    } catch (error) {
      handleError(error, null, notification);
    }
  };

  return (
    <Form onFinish={handleSubmit} form={form}>
      <div style={{ marginBottom: 8 }}>
        <Typography.Title level={regularFontSizeTitle}>
          Chọn địa chỉ:
        </Typography.Title>
        <Radio.Group
          defaultValue={isUseCurrentAddress}
          onChange={(e: any) => {
            setIsUseCurrentAddress(e.target.value);
          }}
        >
          <Radio value={true}>Sử dụng địa chỉ hiện tại</Radio>
          <Radio value={false}>Sử dụng địa chỉ mới</Radio>
        </Radio.Group>
      </div>
      {isUseCurrentAddress ? (
        <p style={{ padding: 4 }}>{address}</p>
      ) : (
        <Form.Item
          rules={[{ required: true, message: "Mời điền địa chỉ " }]}
          initialValue={""}
          name="deliveryAddress"
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>
      )}
      <Typography.Title level={regularFontSizeTitle}>
        Tổng tiền thanh toán
      </Typography.Title>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>
        <NumberFormat value={props.cost}></NumberFormat>
      </div>
      <p style={{ fontSize: "12px" }}>
        Đơn hàng của bạn sẽ thanh toán bằng tiền mặt, chúng tôi sẽ liên hệ qua
        sdt và địa chỉ bạn cung cấp. Nếu chấp nhận xin hãy nhấn đồng ý.
      </p>
      <Button
        htmlType="submit"
        type="primary"
        style={{ width: "100%", maxWidth: 500 }}
      >
        Đồng ý thanh toán
      </Button>
    </Form>
  );
}
