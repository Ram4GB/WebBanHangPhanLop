import { Button, Card, Col, notification, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../../modules/users/reducers";
import { mediumFontSizeTitle } from "../../config";
import { IProduct } from "../../interface";
import NumberFormat from "./NumberFormat";
import ProductDetail from "../shared/ProductDetail";

interface IProps {
  item: IProduct;
}

export default function ProductCard(props: IProps) {
  const { item } = props;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCartAction({ ...item, amount: 1 }));
    notification.success({
      message: `Bỏ 1 ${item.productName} vào giỏ hàng thành công`,
    });
  };

  const handleAddToCartModal = (value: any) => {
    dispatch(addToCartAction({ ...item, amount: value.amount }));
    notification.success({
      message: `Bỏ ${value.amount} ${item.productName} vào giỏ hàng thành công`,
    });
  };

  const handleShowInfo = () => {
    window.Modal.show(
      <ProductDetail
        handleAddToCartModal={handleAddToCartModal}
        item={item}
      ></ProductDetail>,
      {
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
      }
    );
  };

  return (
    <Col style={{ width: "20%", padding: "0px 15px" }}>
      <Card className="card-product">
        <img
          src="https://dienmaycholon.vn/public/picture/product/product16067/product_16067_1.png"
          alt=""
          style={{ width: 200 }}
        />
        <div className="card-product__title">{item.productName}</div>
        <div className="card-product__price">
          <NumberFormat value={item.price}></NumberFormat>
        </div>
        <div className="card-product__description">
          <ul>
            <li>Màn hình: PLS TFT LCD, 6.4", HD+</li>
            <li>Hệ điều hành: Android 10</li>
            <li>Camera sau: Chính 13 MP & Phụ 5 MP, 2 MP</li>
          </ul>
        </div>
        <div className="card-product__action-group">
          <Button size="small" onClick={() => handleShowInfo()}>
            <i className="fas fa-info-circle"></i>{" "}
            <span className="card-product__button-icon">Xem thêm</span>
          </Button>
          <Button size="small" onClick={() => handleAddToCart()} type="primary">
            <i className="fas fa-cart-plus"></i>{" "}
            <span className="card-product__button-icon">Thêm vào</span>
          </Button>
        </div>
      </Card>
    </Col>
  );
}
