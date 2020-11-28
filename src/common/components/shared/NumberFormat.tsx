import React from "react";
import numeral from "numeral";

interface IProps {
  value: number;
  currency?: string;
}

export default function NumberFormat(props: IProps) {
  return (
    <React.Fragment>
      {numeral(props.value).format("0,0")} {props.currency}
    </React.Fragment>
  );
}

NumberFormat.defaultProps = {
  currency: "VND",
};
