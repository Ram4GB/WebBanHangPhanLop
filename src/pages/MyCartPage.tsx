import {
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  Popconfirm,
  Row,
  Table,
  Typography,
} from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "../common/components/shared/CheckoutForm";
import NumberFormat from "../common/components/shared/NumberFormat";
import ProductDetail from "../common/components/shared/ProductDetail";
import {
  largeFontSizeTitle,
  mediumFontSizeTitle,
  vatPrice,
} from "../common/config";
import { IRootState } from "../modules";
import {
  deleteCartAction,
  deleteComboCartAction,
  updateCartAction,
  updateComboCartAction,
} from "../modules/users/reducers";

export default function MyCartPage() {
  const carts = useSelector((state: IRootState) => state.user.carts);
  const comboCarts = useSelector((state: IRootState) => state.user.comboCarts);
  const dispatch = useDispatch();

  const handleChangeAmount = (amount: number, productID: number) => {
    dispatch(updateCartAction({ newAmount: amount, productID }));
  };

  const handleChangeAmountCombo = (amount: number, comboID: any) => {
    dispatch(updateComboCartAction({ newAmount: amount, comboID }));
  };

  const handleDeleteCart = (productID: any) => {
    dispatch(deleteCartAction({ productID }));
  };

  const handleGetTotalPrice = () => {
    let total = 0;
    for (let index = 0; index < carts.length; index++) {
      total += carts[index].price * carts[index].amount;
    }
    for (let index = 0; index < comboCarts.length; index++) {
      total += comboCarts[index].price * comboCarts[index].amount;
    }
    return total;
  };

  const handleShowInfo = (item: any) => {
    window.Modal.show(<ProductDetail item={item}></ProductDetail>, {
      title: (
        <Typography.Title level={mediumFontSizeTitle}>
          Thông tin chi tiết sản phẩm
        </Typography.Title>
      ),
      style: {
        maxWidth: 1000,
        top: 20,
      },
      bodyStyle: {
        padding: "30px 80px",
      },
      width: "90%",
    });
  };

  const handleDeleteComboCart = (comboID: any) => {
    dispatch(deleteComboCartAction({ comboID }));
  };

  const handleCheckout = () => {
    window.Modal.show(
      <CheckoutForm cost={handleGetTotalPrice()}></CheckoutForm>,
      {
        title: <Typography.Title>Thanh toán</Typography.Title>,
        style: {
          top: 20,
        },
      }
    );
  };

  return (
    <div className="container-fluid">
      <Row gutter={12}>
        <Col lg={18}>
          <Card style={{ height: "100%" }}>
            <Typography.Title level={largeFontSizeTitle}>
              Giỏ hàng của bạn
            </Typography.Title>
            <Typography.Title level={mediumFontSizeTitle}>
              Sản phẩm
            </Typography.Title>
            <Table
              style={{ cursor: "pointer" }}
              dataSource={carts}
              rowKey={(i) => i.id}
              pagination={{
                hideOnSinglePage: true,
              }}
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
                        src="https://dienmaycholon.vn/public/picture/product/product16067/product_16067_1.png"
                      />
                    );
                  },
                },
                {
                  title: "Tên sản phẩm",
                  render: (record) => {
                    return (
                      <div
                        style={{ color: "blue" }}
                        onClick={() => handleShowInfo(record)}
                      >
                        {record.productName}
                      </div>
                    );
                  },
                },
                {
                  title: "Số lượng",
                  align: "center",
                  render: (record) => {
                    return (
                      <InputNumber
                        onChange={(newAmount: any) =>
                          handleChangeAmount(newAmount, record.id)
                        }
                        style={{ padding: 9 }}
                        defaultValue={record.amount}
                        max={record.inStock}
                        min={1}
                      ></InputNumber>
                    );
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
                {
                  title: "Hành động",
                  align: "center",
                  render: (record) => {
                    return (
                      <Popconfirm
                        onConfirm={() => handleDeleteCart(record.id)}
                        title="Bạn có chắc chắn muốn xóa"
                      >
                        <Button danger>
                          <i className="fas fa-trash"></i>
                          <span className="ml-1">Xóa</span>
                        </Button>
                      </Popconfirm>
                    );
                  },
                },
              ]}
            ></Table>
            <Divider></Divider>
            <Typography.Title level={mediumFontSizeTitle}>
              Combos
            </Typography.Title>
            <Table
              dataSource={comboCarts}
              rowKey={(i) => i.id}
              pagination={{ hideOnSinglePage: true }}
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

                  render: (record) => (
                    <InputNumber
                      style={{ padding: 9 }}
                      defaultValue={record.amount}
                      onChange={(value: any) =>
                        handleChangeAmountCombo(value, record.id)
                      }
                      min={1}
                    ></InputNumber>
                  ),
                },
                {
                  title: "Giá",
                  dataIndex: "price",
                  render: (value) => (
                    <NumberFormat value={value}></NumberFormat>
                  ),
                },
                {
                  title: "Thành tiên",
                  render: (record) => (
                    <NumberFormat
                      value={record.price * record.amount}
                    ></NumberFormat>
                  ),
                },
                {
                  title: "Hành động",
                  render: (record) => {
                    return (
                      <Popconfirm
                        onConfirm={() => handleDeleteComboCart(record.id)}
                        title="Bạn có chắc chắn muốn xóa"
                      >
                        <Button danger>
                          <i className="fas fa-trash"></i>
                          <span className="ml-1">Xóa</span>
                        </Button>
                      </Popconfirm>
                    );
                  },
                },
              ]}
            ></Table>
          </Card>
        </Col>
        <Col lg={6} style={{ position: "relative", height: "100%" }}>
          <Card style={{ position: "fixed", width: "100%", maxWidth: 300 }}>
            <Typography.Title
              style={{ marginTop: 8 }}
              level={mediumFontSizeTitle}
            >
              Thanh toán
            </Typography.Title>
            <div>
              <h5>Tạm tính:</h5>
              <div style={{ fontSize: 30 }}>
                <NumberFormat
                  value={carts && handleGetTotalPrice()}
                ></NumberFormat>
              </div>
              <h5>VAT:</h5>
              <div style={{ fontSize: 30 }}>
                <NumberFormat value={vatPrice}></NumberFormat>
              </div>
              {carts.length === 0 && comboCarts.length === 0 ? null : (
                <Button
                  size="large"
                  style={{ width: "100%", maxWidth: 500 }}
                  type="primary"
                  onClick={handleCheckout}
                >
                  <span>Thanh toán ngay</span>
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
