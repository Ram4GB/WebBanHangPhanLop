import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getComboList } from "../../../modules/combo/services";
import { borderColor, url } from "../../config";
import { ICombo } from "../../interface";

export default function ComboList() {
  const [comboList, setComboList] = useState<Array<ICombo>>([]);

  useEffect(() => {
    async function init() {
      try {
        let result = await getComboList();
        if (result.status === 200) {
          setComboList(result.data.data);
        }
      } catch (error) {}
    }

    init();
  }, []);

  const renderComboList = () => {
    return comboList.map((item) => {
      return <ComboItem key={item.id} item={item}></ComboItem>;
    });
  };

  return (
    <div>
      <Row gutter={12}>{comboList && renderComboList()}</Row>
    </div>
  );
}

const ComboItem = (props: { item: ICombo }) => {
  const { item } = props;
  return (
    <Col style={{ maxWidth: 300 }} lg={4}>
      <Card
        bodyStyle={{ padding: 5 }}
        style={{ border: borderColor, borderRadius: 4, cursor: "pointer" }}
      >
        <div>
          <img
            style={{
              width: 160,
              height: 130,
              display: "block",
              margin: "auto",
            }}
            src="https://media.istockphoto.com/vectors/prize-box-opening-and-exploding-with-fireworks-and-confetti-enter-to-vector-id1182693467?k=6&m=1182693467&s=612x612&w=0&h=ozv523-UbhtliIEar_NQirCiVg7SvfXkP2nyOBPYIFA="
            alt=""
          />
          <p
            style={{ fontWeight: "bold", fontSize: 18 }}
            className="text-center"
          >
            {item.comboName}
          </p>
          <Link className="text-center d-block" to={url.comboDetail(item.id)}>
            Xem chi tiết
          </Link>
        </div>
      </Card>
    </Col>
  );
};
