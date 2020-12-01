import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BackTop,
  Badge,
  Col,
  Dropdown,
  Layout,
  Menu,
  notification,
  Row,
  Switch,
} from "antd";
import {
  ShoppingCartOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import logo from "../../logo.svg";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../modules";
import {
  logoutAction,
  toggleMode,
  toggleNavbarMobile,
} from "../../modules/users/reducers";
import Login from "../../pages/LoginPage";
import Register from "../../pages/RegisterPage";
import Avatar from "antd/lib/avatar/avatar";
import sun from "../assets/images/svg/sun.svg";
import moon from "../assets/images/svg/moon.svg";
import useMediaQuery from "../components/shared/useMediaQuery";
import { mobileWidth } from "../config";
import MyAffix from "../components/shared/MyAffix";

const { Header, Content, Footer } = Layout;

interface IProps {
  children: any;
}

export default function MainLayout(props: IProps) {
  const { children } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const contentRef = useRef<any>(null);
  const [previousPositionScroll, setPreviousPositionScroll] = useState(0);

  const account = useSelector((state: IRootState) => state.user.account);
  const carts = useSelector((state: IRootState) => state.user.carts);
  const comboCarts = useSelector((state: IRootState) => state.user.comboCarts);
  const mode = useSelector((state: IRootState) => state.user.mode);
  const isShowNavbar = useSelector(
    (state: IRootState) => state.user.mobile.isShowNavbar
  );

  const [media] = useMediaQuery();

  const [timer, setTimer] = useState<any>();

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
    } else if (value.key === "/setting") {
      console.log("Do nothing");
    } else {
      history.push(value.key);
    }
  };

  const handleCroll = useCallback(
    (e: any) => {
      let current = document.documentElement.scrollTop;

      if (timer) {
        clearTimeout(timer);
      }

      let tickyTime = setTimeout(() => {
        document
          .querySelectorAll(".ant-layout-header")[0]
          .classList.remove("hide");
      }, 1000);

      setTimer(tickyTime);

      if (current > previousPositionScroll) {
        document
          .querySelectorAll(".ant-layout-header")[0]
          .classList.add("hide");
        setPreviousPositionScroll(current);

        // đợi khoảng 1s xuất hiện cái header
      } else {
        document
          .querySelectorAll(".ant-layout-header")[0]
          .classList.remove("hide");
        setPreviousPositionScroll(current);
      }
    },
    [previousPositionScroll, timer]
  );

  // bắt sự kiện khi scroll
  useEffect(() => {
    if (media && media.width > mobileWidth) {
      window.addEventListener("scroll", handleCroll);
      setPreviousPositionScroll(document.documentElement.scrollTop);
    }
    return () => {
      window.removeEventListener("scroll", handleCroll);
      setPreviousPositionScroll(0);
    };
  }, [handleCroll, media]);

  const handleToggleMode = (value: any) => {
    // true -> light
    // false -> dark
    dispatch(toggleMode());
  };

  // thay đổi theme
  useEffect(() => {
    if (mode === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [mode]);

  const handleClickShowNavbar = () => {
    dispatch(toggleNavbarMobile());
  };

  return (
    <Layout>
      <Layout className={`site-layout`}>
        <Header
          className={`site-layout-background ${isShowNavbar ? "show" : "hide"}`}
          style={{ padding: "0px 20px", display: "flex", alignItems: "center" }}
          ref={contentRef}
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
            mode={
              media && media.width > mobileWidth ? "horizontal" : "vertical"
            }
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
              <Badge
                style={{ right: 8 }}
                count={carts.length + comboCarts.length}
                showZero
              >
                <ShoppingCartOutlined
                  style={{ fontSize: 20, padding: "0px 10px" }}
                />
              </Badge>
            </Menu.Item>
            <Dropdown
              overlay={
                <Menu style={{ width: 180 }}>
                  <Menu.Item
                    onClick={() =>
                      notification.info({
                        message: "Under construction",
                      })
                    }
                  >
                    <Row>
                      <Col lg={15}>Tiếng việt</Col>
                      <Col lg={9}>
                        <Avatar
                          style={{ width: 25, height: 25 }}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png"
                        ></Avatar>{" "}
                      </Col>
                    </Row>
                  </Menu.Item>
                  <Menu.Item>
                    <Row>
                      <Col lg={15}>Chế độ</Col>
                      <Col lg={9}>
                        <Switch
                          onChange={handleToggleMode}
                          defaultChecked
                          checkedChildren={
                            <Avatar
                              style={{
                                width: 20,
                                height: 20,
                                margin: 0,
                                padding: 0,
                              }}
                              src={sun}
                            />
                          }
                          unCheckedChildren={
                            <Avatar
                              style={{
                                width: 20,
                                height: 20,
                                margin: 0,
                                padding: 0,
                              }}
                              src={moon}
                            />
                          }
                        ></Switch>
                      </Col>
                    </Row>
                  </Menu.Item>
                </Menu>
              }
            >
              <div>
                <SettingOutlined style={{ padding: "0px 25px" }} />
              </div>
            </Dropdown>
          </Menu>
        </Header>
        <Content className={isShowNavbar ? "isShowNavbar" : ""}>
          <div className="site-layout-background">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <div>Web bán hàng Mini</div>
          <div>Copyright © {new Date().getFullYear()} by LMC</div>
        </Footer>
      </Layout>
      <BackTop style={{ right: 30 }}></BackTop>
      <MyAffix onClick={handleClickShowNavbar} style={{ bottom: 5, right: 0 }}>
        <UnorderedListOutlined />
      </MyAffix>
    </Layout>
  );
}
