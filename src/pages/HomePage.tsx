import { Card, Carousel, Col, Row, Typography } from "antd";
import React, { ReactElement } from "react";
import {
  CheckCircleOutlined,
  PoundOutlined,
  SafetyCertificateOutlined,
  CarOutlined,
} from "@ant-design/icons";

import {
  mediumFontSizeTitle,
  marginTopBetweenSection,
  regularFontSizeTitle,
} from "../common/config";
import BrandCarousel from "../common/components/shared/BrandCarousel";
import ComboList from "../common/components/shared/ComboList";
import HomePageProductList from "../common/components/shared/HomePageProductList";

export default function HiAdminPage() {
  return (
    <div className="container-fluid">
      <Card bodyStyle={{ padding: 0 }}>
        <Carousel autoplay>
          <div>
            <div
              style={{
                width: "100%",
                height: 500,
                backgroundImage:
                  'url("https://wallpaperaccess.com/full/2593104.jpg")',
                backgroundPosition: "center",
                backgroundSize: "cover",
                opacity: 0.88,
              }}
            />
          </div>
          <div>
            <div
              style={{
                width: "100%",
                height: 500,
                backgroundImage:
                  'url("https://wallpaperaccess.com/full/2593104.jpg")',
                backgroundPosition: "center",
                backgroundSize: "cover",
                opacity: 0.88,
              }}
            />
          </div>
          <div>
            <div
              style={{
                width: "100%",
                height: 500,
                backgroundImage:
                  'url("https://wallpaperaccess.com/full/2593104.jpg")',
                backgroundPosition: "center",
                backgroundSize: "cover",
                opacity: 0.88,
              }}
            />
          </div>
        </Carousel>
      </Card>
      <div style={{ marginTop: marginTopBetweenSection }}>
        <Row gutter={12}>
          <CategoryCardItem
            icon={
              <CheckCircleOutlined style={{ fontSize: 60, marginBottom: 15 }} />
            }
            title="Sản phẩm chất lượng"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit."
          ></CategoryCardItem>
          <CategoryCardItem
            icon={<PoundOutlined style={{ fontSize: 60, marginBottom: 15 }} />}
            title="Giá cả hợp lý"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit."
          ></CategoryCardItem>
          <CategoryCardItem
            icon={<CarOutlined style={{ fontSize: 60, marginBottom: 15 }} />}
            title="Vận chuyển miễn phí"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit."
          ></CategoryCardItem>
          <CategoryCardItem
            icon={
              <SafetyCertificateOutlined
                style={{ fontSize: 60, marginBottom: 15 }}
              />
            }
            title="An toàn, tiện lợi"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit."
          ></CategoryCardItem>
        </Row>
      </div>
      <Card style={{ marginTop: marginTopBetweenSection }}>
        <Typography.Title level={mediumFontSizeTitle}>
          Thương hiệu
        </Typography.Title>
        <BrandCarousel></BrandCarousel>
      </Card>
      <Card style={{ marginTop: marginTopBetweenSection }}>
        <Typography.Title level={mediumFontSizeTitle}>
          Combo nổi bật
        </Typography.Title>
        <ComboList></ComboList>
      </Card>
      <Card style={{ marginTop: marginTopBetweenSection }}>
        <Typography.Title level={mediumFontSizeTitle}>
          Sản phẩm nổi bật
        </Typography.Title>
        <HomePageProductList></HomePageProductList>
      </Card>
    </div>
  );
}

const CategoryCardItem = (props: {
  title: string;
  description: string;
  icon?: ReactElement;
}) => {
  return (
    <Col lg={6}>
      <Card
        style={{ cursor: "pointer", borderRadius: 4 }}
        className="text-center"
      >
        <Typography.Title className="" level={regularFontSizeTitle}>
          {props.title}
        </Typography.Title>
        <div>{props.icon}</div>
        <div className="text-center">{props.description}</div>
      </Card>
    </Col>
  );
};
