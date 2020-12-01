import React from "react";
import AdvanceCarousel from "react-elastic-carousel";

export default function BrandCarousel() {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 900, itemsToShow: 4 },
  ];
  return (
    <AdvanceCarousel breakPoints={breakPoints} itemsToShow={6}>
      <div>
        <img
          style={{ width: 80, height: 80 }}
          src="https://i.pinimg.com/originals/d0/f6/e2/d0f6e20659a0f84fd40c6ec5ad5695a0.png"
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: 80, height: 80 }}
          src="https://1000logos.net/wp-content/uploads/2017/02/iPhone_logo.png"
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: 80, height: 80 }}
          src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png"
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: 80, height: 80 }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/1024px-Xiaomi_logo.svg.png"
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: 80, height: 80 }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1024px-HP_logo_2012.svg.png"
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: 140, height: 80 }}
          src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo.png"
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: 80, height: 80 }}
          src="https://i.pinimg.com/originals/d0/f6/e2/d0f6e20659a0f84fd40c6ec5ad5695a0.png"
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: 80, height: 80 }}
          src="https://1000logos.net/wp-content/uploads/2017/02/iPhone_logo.png"
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: 80, height: 80 }}
          src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png"
          alt=""
        />
      </div>
    </AdvanceCarousel>
  );
}
