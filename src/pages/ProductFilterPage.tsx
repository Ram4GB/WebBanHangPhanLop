import {
  Card,
  Col,
  notification,
  Row,
  Typography,
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  Button,
  Pagination,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import ProductCard from "../common/components/shared/ProductCard";
import ProductComboCard from "../common/components/shared/ProductComboCard";
import {
  marginTopBetweenSection,
  regularFontSizeTitle,
} from "../common/config";
import { ICategory } from "../common/interface";
import handleError from "../common/utils/handleError";
import { getComboList } from "../modules/combo/services";
import { getCategoryList, getProductList } from "../modules/products/services";

export default function ProductFilterPage() {
  const [combinationArray, setCombinationArray] = useState<Array<any>>();
  const [categories, setCategories] = useState<Array<ICategory>>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    handleSubmitFilter(null);
  }, []);

  async function getData() {
    try {
      let categories = await getCategoryList();
      if (categories.status === 200) {
        setCategories(categories.data.data);
      }
    } catch (error) {
      handleError(error, null, notification);
    }
  }

  const handleSubmitFilter = async (value: any) => {
    setLoading(true);
    let products: any;
    let combos: any;
    try {
      products = await getProductList();
      combos = await getComboList();
      products = products.data.data;
      combos = combos.data.data;
    } catch (error) {
      handleError(error, null, notification);
    }
    if (products && combos) {
      let pTemp = [...products];
      let cTemp = [...combos];

      if (value) {
        if (value.productName) {
          pTemp = pTemp.filter(
            (item) => item.productName.indexOf(value.productName) !== -1
          );
          cTemp = cTemp.filter(
            (item) => item.comboName.indexOf(value.productName) !== -1
          );
        }

        if (value.categories && value.categories.length > 0) {
          pTemp = pTemp.filter(
            (item) =>
              value.categories.findIndex(
                (category: any) => category === item.catalog.id
              ) !== -1
          );
        }

        if (value.priceFrom) {
          pTemp = pTemp.filter((item) => value.priceFrom <= item.price);
          cTemp = cTemp.filter((item) => value.priceFrom <= item.price);
        }

        if (value.priceTo) {
          pTemp = pTemp.filter((item) => item.price <= value.priceTo);
          cTemp = cTemp.filter((item) => item.price <= value.priceTo);
        }

        if (value.type) {
          if (value.type === "") {
          } else if (value.type === "product") {
            cTemp = [];
          } else if (value.type === "combo") {
            pTemp = [];
          }
        }
      }

      let combinationArray = [...cTemp, ...pTemp];
      setCombinationArray(combinationArray);
      setCurrentPage(1);
    }
    setLoading(false);
  };

  console.log(combinationArray);

  const handleChangePage = (value: any) => {
    setCurrentPage(value);
  };

  const handleRenderContent = () => {
    let p: any = [];
    let c: any = [];

    let temp = combinationArray
      ? combinationArray.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      : [];

    if (combinationArray) {
      temp.forEach((item) => {
        if (item.productName !== undefined) {
          p.push(item);
        } else {
          c.push(item);
        }
      });
    }

    return (
      <React.Fragment>
        {p
          ? p.map((item: any) => {
              return (
                <ProductCard
                  key={item.id}
                  styles={{ padding: "0px 8px" }}
                  width="25%"
                  item={item}
                ></ProductCard>
              );
            })
          : null}
        {c
          ? c.map((item: any) => {
              return (
                <ProductComboCard
                  key={item.id}
                  styles={{ padding: "0px 8px" }}
                  width="25%"
                  item={item}
                ></ProductComboCard>
              );
            })
          : null}
      </React.Fragment>
    );
  };

  const handleRemoveFilter = () => {
    form.resetFields();
    handleSubmitFilter(null);
  };

  return (
    <div className="container-fluid">
      <div>
        <Row
          style={{ marginTop: marginTopBetweenSection / 2, padding: 0 }}
          gutter={12}
        >
          <Col lg={5}>
            <Card style={{ height: "100%" }}>
              <Form form={form} onFinish={handleSubmitFilter} layout="vertical">
                <Form.Item
                  label={
                    <Typography.Title level={regularFontSizeTitle}>
                      Tên sản phẩm/combo:
                    </Typography.Title>
                  }
                  name="productName"
                >
                  <Input
                    style={{ width: 250 }}
                    placeholder="Mời điền tên sản phẩm/combo"
                  />
                </Form.Item>
                <Form.Item
                  name="categories"
                  label={
                    <Typography.Title level={regularFontSizeTitle}>
                      Danh mục:
                    </Typography.Title>
                  }
                >
                  <Select
                    style={{ width: 250 }}
                    placeholder="Mời điền tên sản phẩm"
                    allowClear
                    mode="multiple"
                  >
                    {categories &&
                      categories.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.catalogName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Row>
                  <Col lg={12}>
                    <Form.Item
                      name="priceFrom"
                      label={
                        <Typography.Title level={regularFontSizeTitle}>
                          Giá từ:
                        </Typography.Title>
                      }
                    >
                      <InputNumber
                        min={1}
                        style={{ width: 120 }}
                        placeholder="Từ"
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col lg={12}>
                    <Form.Item
                      name="priceTo"
                      label={
                        <Typography.Title level={regularFontSizeTitle}>
                          Giá đến:
                        </Typography.Title>
                      }
                    >
                      <InputNumber
                        min={1}
                        style={{ width: 120 }}
                        placeholder="Đến"
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="type"
                  initialValue=""
                  label={
                    <Typography.Title level={regularFontSizeTitle}>
                      Loại hình:
                    </Typography.Title>
                  }
                >
                  <Radio.Group>
                    <Radio value="">Tất cả</Radio>
                    <Radio value="product">Sản phẩm</Radio>
                    <Radio value="combo">Combo</Radio>
                  </Radio.Group>
                </Form.Item>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button onClick={handleRemoveFilter}>Hủy lọc</Button>{" "}
                  <Button type="primary" htmlType="submit">
                    Lọc ngay
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
          <Col lg={19}>
            <Card>
              <p>Tổng sản phẩm: {combinationArray?.length} sản phẩm</p>
              <Row>
                {!loading ? handleRenderContent() : <div>Đang tìm kiếm</div>}
              </Row>
              <div
                style={{ marginTop: 10, paddingLeft: 5, textAlign: "right" }}
              >
                <Pagination
                  onChange={handleChangePage}
                  total={combinationArray?.length}
                  current={currentPage}
                  pageSize={pageSize}
                ></Pagination>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
