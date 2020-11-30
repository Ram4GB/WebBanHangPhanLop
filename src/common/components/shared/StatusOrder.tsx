import { Tag } from "antd";
import React from "react";

interface IProps {
  status: string;
}

export default function StatusOrder(props: IProps) {
  switch (props.status) {
    case "Accepted":
      return <Tag color="green">Chấp nhận</Tag>;
    case "Refused":
      return <Tag color="red">Từ chối</Tag>;
    case "New":
      return <Tag color="blue">Mới</Tag>;
    default:
      return <p>Chưa có trạng thái</p>;
  }
}
