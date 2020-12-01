import { Descriptions, notification, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getOrderDetail } from "../../../modules/users/services";
import { mediumFontSizeTitle, regularFontSizeTitle } from "../../config";
import handleError from "../../utils/handleError";
import DateFormat from "./DateFormat";
import NumberFormat from "./NumberFormat";
import StatusOrder from "./StatusOrder";
import productImage from "../../assets/images/products/product.png";

interface IProps {
  orderID: string;
}

OrderDetailOfUser.defaultProps = {
  orderID: null,
};

export default function OrderDetailOfUser(props: IProps) {
  const [order, setOrder] = useState<any>();

  useEffect(() => {
    async function init() {
      if (props.orderID) {
        try {
          let result = await getOrderDetail(props.orderID);
          if (result.status === 200) {
            let temp = {
              ...result.data.data,
            };

            temp.combos = temp.combos ? temp.combos.filter((i: any) => i) : [];
            temp.products = temp.products
              ? temp.products.filter((i: any) => i)
              : [];

            setOrder(temp);
          }
        } catch (error) {
          handleError(error, null, notification);
        }
      }
    }
    init();
  }, [props.orderID]);

  return order ? (
    <div>
      <Typography.Title level={regularFontSizeTitle}>
        Tổng tiền: <NumberFormat value={order.totalPrice}></NumberFormat>
      </Typography.Title>
      <Descriptions>
        <Descriptions.Item label="Mã đơn hàng">
          {order.idString}
        </Descriptions.Item>
        <Descriptions.Item label="Tình trạng">
          <StatusOrder status={order.status}></StatusOrder>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          <DateFormat date={order.createdAt}></DateFormat>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày vận chuyển">
          <DateFormat date={order.deliveryDate}></DateFormat>
        </Descriptions.Item>
      </Descriptions>

      {order.products.length > 0 && (
        <>
          <Typography.Title level={mediumFontSizeTitle}>
            Sản phẩm
          </Typography.Title>
          <Table
            dataSource={order.products}
            columns={[
              {
                title: "STT",
                align: "center",
                render: (value, record, index) => {
                  return index;
                },
              },
              {
                title: "Hình ảnh",
                width: 200,
                render: (value, record, index) => {
                  return (
                    <img
                      style={{ width: 80, height: 80 }}
                      alt=""
                      src={productImage}
                    />
                  );
                },
              },
              {
                title: "Tên sản phẩm",
                dataIndex: "productName",
              },
              {
                title: "Số lượng",
                align: "center",
                dataIndex: "amount",
                render: (value) => {
                  return <NumberFormat value={value}></NumberFormat>;
                },
              },
              {
                title: "Giá",
                align: "center",
                render: (record) => {
                  return <NumberFormat value={record.price}></NumberFormat>;
                },
              },
              {
                title: "Thành tiền",
                align: "center",
                render: (record) => {
                  return (
                    <NumberFormat
                      value={record.price * record.amount}
                    ></NumberFormat>
                  );
                },
              },
            ]}
          ></Table>
        </>
      )}

      {order.combos.length > 0 && (
        <>
          <Typography.Title level={mediumFontSizeTitle}>Combo</Typography.Title>
          <Table
            dataSource={order.combos || []}
            columns={[
              {
                title: "STT",
                render: (value, record, index) => <p>{index}</p>,
              },
              {
                title: "Tên Combo",
                dataIndex: "comboName",
                render: (value) => <p>{value}</p>,
              },
              {
                title: "Số lượng",
                dataIndex: "amount",
                render: (value) => {
                  return <NumberFormat value={value}></NumberFormat>;
                },
              },
              {
                title: "Giá",
                dataIndex: "price",
                render: (value) => <NumberFormat value={value}></NumberFormat>,
              },
              {
                title: "Thành tiên",
                render: (record) => (
                  <NumberFormat
                    value={record.price * record.amount}
                  ></NumberFormat>
                ),
              },
            ]}
          ></Table>
        </>
      )}
    </div>
  ) : null;
}
