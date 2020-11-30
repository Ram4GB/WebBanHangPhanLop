import React from "react";
import { Layout, Menu, notification } from "antd";
import logo from "../../logo.svg";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../modules";
import { logoutAction } from "../../modules/users/reducers";
import Login from "../../pages/LoginPage";
import Register from "../../pages/RegisterPage";

const { Header, Content, Footer } = Layout;

interface IProps {
  children: any;
}

export default function MainLayout(props: IProps) {
  const { children } = props;
  const history = useHistory();
  const account = useSelector((state: IRootState) => state.user.account);
  const dispatch = useDispatch();

  const handleSelectMenu = (value: any) => {
    if (value.key === "/logout") {
      dispatch(logoutAction());
      notification.success({
        message: "Đăng xuất thành công",
      });
    } else if (value.key === "/login") {
      window.Modal.show(<Login></Login>, {
        width: "40%",
        style: {
          maxWidth: 900,
        },
      });
    } else if (value.key === "/register") {
      window.Modal.show(<Register></Register>, {
        width: "40%",
        style: {
          maxWidth: 900,
        },
      });
    } else {
      history.push(value.key);
    }
  };

  return (
    <Layout>
      <Layout className="site-layout ">
        {/* <div style={{ display: "flex" }} className="small-header">
          <ul>
            <AuthRender>
              <React.Fragment>
                <li onClick={() => history.push("/me")}>
                  <i className="fas fa-user"></i>
                  <span>Thông tin cá nhân</span>
                </li>
                <li>
                  <i className="fas fa-cubes"></i>
                  <span>Đơn hàng</span>
                </li>
              </React.Fragment>
            </AuthRender>
            <li>
              <i className="far fa-newspaper"></i>
              <span>Tin tức</span>
            </li>
          </ul>
        </div> */}
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
            {!account ? (
              <>
                <Menu.Item key="/register">Đăng ký</Menu.Item>
              </>
            ) : (
              <Menu.Item key="/me/info">Thông tin của tôi</Menu.Item>
            )}
            <Menu.Item
              style={{ marginLeft: "auto" }}
              key={account ? "/logout" : "/login"}
            >
              {account ? "Đăng xuất" : "Đăng nhập"}
            </Menu.Item>
            <Menu.Item key="/carts">
              <i className="fas fa-shopping-cart"></i>
              <span className="ml-1">Giỏ hàng</span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            width: "88%",
            margin: "auto",
            minHeight: "96vh",
            backgroundColor: "#fff",
          }}
        >
          <div className="site-layout-background">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Web bán hàng mini</Footer>
      </Layout>
    </Layout>
  );
}
