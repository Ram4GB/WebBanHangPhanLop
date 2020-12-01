import {
  Button,
  Card,
  notification,
  PageHeader,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import NumberFormat from "../common/components/shared/NumberFormat";
import { largeFontSizeTitle, mediumFontSizeTitle } from "../common/config";
import { ICombo } from "../common/interface";
import handleError from "../common/utils/handleError";
import { getComboByID } from "../modules/combo/services";
import ProductDetail from "../common/components/shared/ProductDetail";
import TagInStock from "../common/components/shared/TagInStock";
import { useDispatch } from "react-redux";
import { addComboToCartAction } from "../modules/users/reducers";
import productImage from "../common/assets/images/products/product.png";

interface IProps {
  comboID: any;
  isShowPageHeader?: boolean;
}

export default function ComboDetailPage(props: IProps) {
  const { comboID } = props;
  const [combo, setCombo] = useState<ICombo | null>(null);
  const params = useParams<{ comboID: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (comboID) {
      init(comboID);
    } else if (params.comboID) {
      init(params.comboID);
    }

    async function init(comboID: string) {
      try {
        let result = await getComboByID(comboID);
        if (result.status === 200) {
          setCombo(result.data.data);
        }
      } catch (error) {
        handleError(error, null, notification);
      }
    }
  }, [params.comboID, comboID]);

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

  const handleAddComboToCart = () => {
    if (combo) {
      dispatch(addComboToCartAction({ ...combo, amount: 1 }));
      notification.success({
        message: "Thêm combo thành công",
      });
    }
  };

  // const handleAddToCartModal = (value: any) => {
  //   dispatch(addToCartAction({ ...item, amount: value.amount }));
  //   notification.success({
  //     message: `Bỏ ${value.amount} ${item.productName} vào giỏ hàng thành công`,
  //   });
  // };

  return (
    <div className="container-fluid">
      <Card
        title={
          props.isShowPageHeader ? (
            <PageHeader
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography.Title level={largeFontSizeTitle}>
                    Thông tin chi tiết của combo {combo && combo.comboName}
                  </Typography.Title>
                </div>
              }
              onBack={() => window.history.back()}
              extra={
                <Button onClick={handleAddComboToCart} type="primary">
                  <i className="fas fa-cart-arrow-down"></i>
                  <span className="ml-1">Thêm combo này vào giỏ</span>
                </Button>
              }
            ></PageHeader>
          ) : null
        }
      >
        {combo && (
          <div>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: "30px",
                  color: "#dc3545",
                  fontWeight: "bold",
                }}
              >
                <del>
                  <NumberFormat value={combo.originalPrice}></NumberFormat>
                </del>
              </span>{" "}
              <span
                style={{
                  fontSize: "35px",
                  margin: "0px 20px",
                }}
              >
                Giảm <span>{combo.discountPercent}%</span> chỉ còn
              </span>{" "}
              <span
                style={{
                  color: "#28a745",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                <NumberFormat value={combo.price}></NumberFormat>
              </span>
            </div>
            <Table
              style={{ cursor: "pointer" }}
              dataSource={combo.products}
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
                        src={productImage}
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
                  title: "Tình trạng",
                  align: "center",
                  render: (record) => {
                    return <TagInStock inStock={record.inStock}></TagInStock>;
                  },
                },
                {
                  title: "Giá",
                  align: "center",
                  render: (record) => {
                    return <NumberFormat value={record.price}></NumberFormat>;
                  },
                },
              ]}
            ></Table>
            <Typography.Title
              style={{ marginTop: 15 }}
              level={mediumFontSizeTitle}
            >
              Mô tả
            </Typography.Title>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
              et possimus eaque sapiente cum eligendi officia quae corrupti
              molestiae tenetur alias rerum, aliquam unde error temporibus
              aspernatur, voluptatum reprehenderit voluptates.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

ComboDetailPage.defaultProps = {
  isShowPageHeader: true,
};
