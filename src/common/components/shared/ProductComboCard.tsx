import { Button, Card, Col, notification, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addComboToCartAction } from "../../../modules/users/reducers";
import { mediumFontSizeTitle } from "../../config";
import { ICombo } from "../../interface";
import NumberFormat from "./NumberFormat";
import handleError from "../../utils/handleError";
import { getComboByID } from "../../../modules/combo/services";
import ComboDetailPage from "../../../pages/ComboDetailPage";

interface IProps {
  item: ICombo;
  comboID?: string;
  width?: string;
  styles?: any;
}

export default function ProductComboCard(props: IProps) {
  const dispatch = useDispatch();
  const [item, setItem] = useState<ICombo>();

  useEffect(() => {
    if (props.item) {
      setItem(props.item);
    } else if (props.comboID) {
      loadCombo(props.comboID);
    }

    async function loadCombo(comboID: any) {
      try {
        let result = await getComboByID(comboID);
        if (result.status === 200) {
          setItem(result.data.data);
        }
      } catch (error) {
        handleError(error, null, notification);
      }
    }
  }, [props.comboID, props.item]);

  const handleAddToCart = () => {
    if (item) {
      dispatch(addComboToCartAction({ ...item, amount: 1 }));
      notification.success({
        message: `Bỏ 1 ${item.comboName} vào giỏ hàng thành công`,
      });
    }
  };

  const handleShowInfo = () => {
    if (item) {
      window.Modal.show(
        <ComboDetailPage
          isShowPageHeader={false}
          comboID={item.id}
        ></ComboDetailPage>,
        {
          title: (
            <Typography.Title level={mediumFontSizeTitle}>
              Thông tin chi tiết sản phẩm
            </Typography.Title>
          ),
          style: {
            maxWidth: 1150,
            top: 20,
          },
          bodyStyle: {
            padding: "30px 80px",
          },
          width: "100%",
        }
      );
    }
  };

  return item ? (
    <Col style={{ width: props.width, padding: "0px 15px", ...props.styles }}>
      <Card className="card-product">
        <img
          src="https://media.istockphoto.com/vectors/prize-box-opening-and-exploding-with-fireworks-and-confetti-enter-to-vector-id1182693467?k=6&m=1182693467&s=612x612&w=0&h=ozv523-UbhtliIEar_NQirCiVg7SvfXkP2nyOBPYIFA="
          alt=""
        />
        <div className="card-product__title">{item.comboName}</div>
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

ProductComboCard.defaultProps = {
  width: "20%",
};
