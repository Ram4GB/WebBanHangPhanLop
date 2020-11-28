import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ZoomImage() {
  return (
    <TransformWrapper>
      <TransformComponent>
        <img
          style={{
            width: 500,
          }}
          src="https://dienmaycholon.vn/public/picture/product/product16067/product_16067_1.png"
          alt="test"
        />
      </TransformComponent>
    </TransformWrapper>
  );
}
