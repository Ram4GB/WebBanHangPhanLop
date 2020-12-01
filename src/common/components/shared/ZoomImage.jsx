import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import productImage from "../../assets/images/products/product.png";

export default function ZoomImage() {
  return (
    <TransformWrapper>
      <TransformComponent>
        <img
          style={{
            width: 500,
          }}
          src={productImage}
          alt="test"
        />
      </TransformComponent>
    </TransformWrapper>
  );
}
