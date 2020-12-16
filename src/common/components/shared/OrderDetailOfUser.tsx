import { Descriptions, notification, Steps, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";

import { getOrderDetail } from "../../../modules/users/services";
import {
  mediumFontSizeTitle,
  regularFontSizeTitle,
  rootImageAPI,
} from "../../config";
import handleError from "../../utils/handleError";
import DateFormat from "./DateFormat";
import NumberFormat from "./NumberFormat";

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

  const renderTimeLine = () => {
    console.log(order.status);

    switch (order.status) {
      case "New":
        return (
          <Steps current={0}>
            <Steps.Step title={"Đặt hàng đang xử lý"}></Steps.Step>
            <Steps.Step title={"Giao hàng"}></Steps.Step>
          </Steps>
        );
      case "Accepted":
        return (
          <Steps current={1}>
            <Steps.Step title={"Đặt hàng thành công"}></Steps.Step>
            <Steps.Step
              status="process"
              title={"Giao hàng thành công"}
            ></Steps.Step>
          </Steps>
        );
      case "Refused":
        return (
          <Steps current={1}>
            <Steps.Step title={"Đặt hàng"}></Steps.Step>
            <Steps.Step
              status="error"
              title={"Giao hàng không thành công"}
            ></Steps.Step>
          </Steps>
        );
    }

    return null;
  };

  return order ? (
    <div>
      <Typography.Title level={regularFontSizeTitle}>
        Tổng tiền: <NumberFormat value={order.totalPrice}></NumberFormat>
      </Typography.Title>
      <Descriptions>
        <Descriptions.Item label="Mã đơn hàng">
          {order.idString}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          <DateFormat date={order.createdAt}></DateFormat>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày vận chuyển">
          <DateFormat date={order.deliveryDate}></DateFormat>
        </Descriptions.Item>
      </Descriptions>

      {order ? (
        <React.Fragment>
          <Typography.Title level={mediumFontSizeTitle}>
            Trạng thái
          </Typography.Title>
          <div className="py-3">{renderTimeLine()}</div>
        </React.Fragment>
      ) : null}

      {order.products.length > 0 && (
        <>
          <Typography.Title level={mediumFontSizeTitle}>
            Sản phẩm
          </Typography.Title>
          <Table
            rowKey={(i) => i.id}
            scroll={{ x: "100%" }}
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
                      style={{ width: 120, height: 80 }}
                      alt=""
                      src={rootImageAPI + record.imageUrl}
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
                  return value;
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
            scroll={{ x: "100%" }}
            rowKey={(i) => i.id}
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
