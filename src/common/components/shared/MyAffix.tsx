import React from "react";

interface IProps {
  children: any;
  style: any;
  onClick?: () => void;
}

export default function MyAffix(props: IProps) {
  return (
    <div
      style={{
        ...props.style,
      }}
      className="affix-mobile"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
