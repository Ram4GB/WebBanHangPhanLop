import { notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getProductList } from "../../../modules/products/services";
import { IProduct } from "../../interface";
import handleError from "../../utils/handleError";
import ProductCard from "./ProductCard";

export default function HomePageProductList() {
  const [products, setProducts] = useState<Array<IProduct>>([]);

  useEffect(() => {
    async function init() {
      try {
        let result = await getProductList();
        if (result.status === 200) {
          setProducts(result.data.data);
        }
      } catch (error) {
        handleError(error, null, notification);
      }
    }
    init();
  }, []);

  return (
    <div>
      <Row gutter={12}>
        {products &&
          products.slice(0, 10).map((item) => {
            return <ProductCard key={item.id} item={item}></ProductCard>;
          })}
      </Row>
    </div>
  );
}
