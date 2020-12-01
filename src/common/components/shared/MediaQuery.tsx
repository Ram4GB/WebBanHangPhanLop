import React from "react";

interface IProps {
  children: any;
  [restProp: string]: any;
}

export default function MediaQuery(props: IProps) {
  // dùng để ẩn hiện component
  return (
    <div className="max-width-900" {...props}>
      {props.children}
    </div>
  );
}
