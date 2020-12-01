import { Button, Card, notification, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DateFormat from "../common/components/shared/DateFormat";
import NumberFormat from "../common/components/shared/NumberFormat";
import OrderDetailOfUser from "../common/components/shared/OrderDetailOfUser";
import StatusOrder from "../common/components/shared/StatusOrder";
import UserContainer from "../common/components/shared/UserContainer";
import { largeFontSizeTitle } from "../common/config";
import handleError from "../common/utils/handleError";
import { IRootState } from "../modules";
import { getUserProfile } from "../modules/users/services";

interface IOrderDetail {
  id: number;
  createdAt: string;
  totalPrice: number;
  deliveryDate: string;
  deliveryAddress: string;
  status: string;
  employeeId: any;
  employee: any;
  idString: any;
}

export default function UserOrderPage() {
  const [orders, setOrders] = useState<Array<IOrderDetail>>();
  const userID = useSelector((state: IRootState) => state.user.account?.id);

  useEffect(() => {
    async function init() {
      try {
        let result = await getUserProfile(userID);
        if (result.status === 200) {
          setOrders(result.data.data.orders);
        }
      } catch (error) {
        handleError(error, null, notification);
      }
    }
    init();
  }, [userID]);

  const handleInfo = (id: any) => {
    window.Modal.show(<OrderDetailOfUser orderID={id}></OrderDetailOfUser>, {
      title: <Typography.Title>Thông tin đơn hàng</Typography.Title>,
      style: {
        top: 20,
      },
      width: 800,
    });
  };

  return (
    <UserContainer>
      <Card
        title={
          <Typography.Title level={largeFontSizeTitle}>
            Đơn hàng của bạn
          </Typography.Title>
        }
      >
        <Table
          scroll={{ x: "100%" }}
          dataSource={orders}
          rowKey={(i) => i.id}
          pagination={{
            hideOnSinglePage: true,
          }}
          columns={[
            {
              title: "Mã đơn hàng",
              dataIndex: "id",
            },
            {
              title: "Ngày vận chuyển",
              dataIndex: "deliveryDate",
              render: (value) => {
                return value ? (
                  <DateFormat date={value}></DateFormat>
                ) : (
                  "Đang đợi xử lý"
                );
              },
            },
            {
              title: "Địa chỉ vận chuyển",
              dataIndex: "deliveryAddress",
            },
            {
              title: "Tổng tiền",
              dataIndex: "totalPrice",
              render: (value) => {
                return <NumberFormat value={value}></NumberFormat>;
              },
            },
            {
              title: "Trạng thái",
              dataIndex: "status",
              render: (value) => {
                return <StatusOrder status={value}></StatusOrder>;
              },
            },
            {
              title: "Hành động",
              render: (record) => {
                return (
                  <Button onClick={() => handleInfo(record.id)} type="primary">
                    Xem chi tiết
                  </Button>
                );
              },
            },
          ]}
        ></Table>
      </Card>
    </UserContainer>
  );
}
