import React from "react";
import { Layout, Menu, notification } from "antd";
import logo from "../../logo.svg";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../modules";
import { logoutAction } from "../../modules/users/reducers";

const { Header, Content, Footer } = Layout;
// const { SubMenu } = Menu;

interface IProps {
  children: any;
}

export default function MainLayout(props: IProps) {
  const { children } = props;
  const history = useHistory();
  const user = useSelector((state: IRootState) => state.user.account);
  const dispatch = useDispatch();

  const handleSelectMenu = (value: any) => {
    if (value.key === "/logout") {
      dispatch(logoutAction());
      notification.success({
        message: "Đăng xuất thành công",
      });
    } else {
      history.push(value.key);
    }
  };

  console.log(user);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout ">
        <Header
          className="site-layout-background"
          style={{ padding: "0px 20px", display: "flex", alignItems: "center" }}
        >
          <img
            style={{
              width: 50,
              height: 50,
            }}
            src={logo}
            alt="Logo"
          />

          <Menu
            style={{ flex: 1, display: "flex" }}
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            onClick={handleSelectMenu}
          >
            <Menu.Item key="/">Trang chủ</Menu.Item>
            <Menu.Item key="/products">Sản phẩm</Menu.Item>
            <Menu.Item key="/orders">Đơn hàng</Menu.Item>
            <Menu.Item
              style={{ marginLeft: "auto" }}
              key={user ? "/logout" : "login"}
            >
              {user ? "Đăng xuất" : "Đăng nhập"}
            </Menu.Item>
            <Menu.Item key="/carts">
              <i className="fas fa-shopping-cart"></i>
              <span className="ml-1">Giỏ hàng</span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ width: "100%", margin: "auto" }}>
          <div className="site-layout-background">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Web bán hàng mini</Footer>
      </Layout>
    </Layout>
  );
}
