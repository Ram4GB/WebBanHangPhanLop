import { Button, Card, Col, notification, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../../modules/users/reducers";
import { mediumFontSizeTitle } from "../../config";
import { IProduct } from "../../interface";
import NumberFormat from "./NumberFormat";
import ProductDetail from "../shared/ProductDetail";
import { getProductByID } from "../../../modules/products/services";
import handleError from "../../utils/handleError";
import productImage from "../../assets/images/products/product.png";

interface IProps {
  item: IProduct;
  productID?: string;
  width?: string;
  styles?: any;
}

export default function ProductCard(props: IProps) {
  const dispatch = useDispatch();
  const [item, setItem] = useState<IProduct>();

  useEffect(() => {
    if (props.item) {
      setItem(props.item);
    } else if (props.productID) {
      loadProduct(props.productID);
    }

    async function loadProduct(productID: any) {
      try {
        let result = await getProductByID(productID);
        if (result.status === 200) {
          setItem(result.data.data);
        }
      } catch (error) {
        handleError(error, null, notification);
      }
    }
  }, [props.item, props.productID]);

  const handleAddToCart = () => {
    if (item) {
      dispatch(addToCartAction({ ...item, amount: 1 }));
      notification.success({
        message: `Bỏ 1 ${item.productName} vào giỏ hàng thành công`,
      });
    }
  };

  const handleAddToCartModal = (value: any) => {
    if (item) {
      dispatch(addToCartAction({ ...item, amount: value.amount }));
      notification.success({
        message: `Bỏ ${value.amount} ${item.productName} vào giỏ hàng thành công`,
      });
    }
  };

  const handleShowInfo = () => {
    if (item) {
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
    }
  };

  return item ? (
    <Col
      className="col-card-custom"
      style={{ width: props.width, padding: "0px 15px", ...props.styles }}
    >
      <Card className="card-product">
        <img src={productImage} alt="" />
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
            <span className="card-product__button-icon">Xem</span>
          </Button>
          <Button size="small" onClick={() => handleAddToCart()} type="primary">
            <i className="fas fa-cart-plus"></i>{" "}
            <span className="card-product__button-icon">Thêm</span>
          </Button>
        </div>
      </Card>
    </Col>
  ) : null;
}

ProductCard.defaultProps = {
  width: "20%",
};
