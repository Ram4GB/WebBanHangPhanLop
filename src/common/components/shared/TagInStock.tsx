import { Tag } from "antd";
import React from "react";

interface IProps {
  inStock: number;
}

export default function TagInStock(props: IProps) {
  return (
    <Tag color={props.inStock > 0 ? "#87d068" : "#f50"}>
      {props.inStock > 0 ? "Còn hàng" : "Tạm thời hết"}
    </Tag>
  );
}
