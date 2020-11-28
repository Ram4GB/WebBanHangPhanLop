import React from "react";
import {
  Button,
  Col,
  Divider,
  Row,
  Typography,
  Form,
  InputNumber,
  Tag,
} from "antd";
import TagInStock from "./TagInStock";

import { regularFontSizeTitle } from "../../config";
import NumberFormat from "./NumberFormat";
import { IProduct } from "../../interface";
import ZoomImage from "./ZoomImage";

interface IProps {
  item: IProduct;
  handleAddToCartModal?: (value: any) => void;
}

export default function ProductDetail(props: IProps) {
  const { item, handleAddToCartModal } = props;
  return (
    <Row gutter={12}>
      <Col style={{ overflow: "hidden" }} lg={14}>
        <ZoomImage></ZoomImage>
        <p
          style={{
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          Kéo con lăn để zoom to
        </p>
      </Col>
      <Col lg={10}>
        <Typography.Title level={regularFontSizeTitle}>
          {item.productName}
        </Typography.Title>
        <h3>
          <NumberFormat value={item.price}></NumberFormat>
        </h3>
        <TagInStock inStock={item.inStock}></TagInStock>
        <Divider></Divider>
        {handleAddToCartModal && (
          <Form onFinish={handleAddToCartModal} style={{ display: "flex" }}>
            <Form.Item
              rules={[{ required: true, message: "Mời bạn điền số" }]}
              name="amount"
              initialValue={1}
            >
              <InputNumber
                style={{ width: 200, padding: 20, fontSize: 18 }}
                placeholder="Số lượng"
                max={99}
                min={1}
              />
            </Form.Item>
            <Button
              type="primary"
              style={{ height: 72, borderRadius: "0px 4px 4px 0px" }}
              htmlType="submit"
            >
              <i className="fas fa-cart-plus"></i>{" "}
              <span style={{ marginLeft: 5 }}>THÊM VÀO</span>
            </Button>
          </Form>
        )}
        <h3>Mô tả:</h3>
        <ul style={{ marginTop: 8, padding: 0, paddingLeft: 14 }}>
          <li>Màn hình: PLS TFT LCD, 6.4", HD+</li>
          <li>Hệ điều hành: Android 10</li>
          <li>Camera sau: Chính 13 MP & Phụ 5 MP, 2 MP</li>
        </ul>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          voluptate quia qui incidunt dolorem perferendis debitis aliquam
        </div>
        {item.catalog && (
          <div className="category-group-tag pt-2">
            <Tag color="blue">{item.catalog.catalogName}</Tag>
          </div>
        )}
      </Col>
    </Row>
  );
}
