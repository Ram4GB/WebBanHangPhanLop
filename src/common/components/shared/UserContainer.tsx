import { Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  children?: any;
}
export default function UserContainer(props: IProps) {
  return (
    <div style={{ height: "100%" }} className="container-fluid">
      <Row gutter={12} style={{ height: "100%" }}>
        <Col lg={4}>
          <Card bodyStyle={{ padding: 0 }}>
            <ul className="user-menu">
              <Link to="/me/info">
                <li className="user-menu__item">1. Thông tin cá nhân</li>
              </Link>
              <Link to="/me/order">
                <li className="user-menu__item">2. Đơn hàng của bạn</li>
              </Link>
              <Link to="/me/change-password">
                <li className="user-menu__item">3. Đổi mật khẩu</li>
              </Link>
            </ul>
          </Card>
        </Col>
        <Col lg={20}>{props.children}</Col>
      </Row>
    </div>
  );
}

UserContainer.defaultProps = {
  children: null,
};
