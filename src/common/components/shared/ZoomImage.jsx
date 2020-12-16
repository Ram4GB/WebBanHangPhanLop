import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { rootImageAPI } from "../../config";

export default function ZoomImage(props) {
  return (
    <TransformWrapper>
      <TransformComponent>
        <img
          style={{
            width: 500,
          }}
          src={rootImageAPI + props.image}
          alt="test"
        />
      </TransformComponent>
    </TransformWrapper>
  );
}
