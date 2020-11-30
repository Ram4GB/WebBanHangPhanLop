import React from "react";
import { formatTimeStamp } from "../../config";
import moment from "moment";

interface IProps {
  date: string;
}
export default function DateFormat(props: IProps) {
  return <>{props.date ? moment(props.date).format(formatTimeStamp) : ""}</>;
}
