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
        position: "fixed",
        ...props.style,
        border: "1px solid #111",
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
      }}
      className="affix-mobile"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
