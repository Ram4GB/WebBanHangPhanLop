import { Button, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserContainer from "../common/components/shared/UserContainer";
import handleError from "../common/utils/handleError";
import { IRootState } from "../modules";
import { getUserProfile } from "../modules/users/services";

export default function StaticsOrderPage() {
  const [orders, setOrders] = useState();
  const userID = useSelector((state: IRootState) => state.user.account?.id);

  const getData = useCallback(async () => {
    try {
      let result = await getUserProfile(userID);
      if (result.status === 200) {
        setOrders(result.data.data.orders);
      }
    } catch (error) {
      handleError(error, null, notification);
    }
  }, [userID]);

  useEffect(() => {
    getData();
  }, [getData]);

  console.log(orders);

  return (
    <UserContainer>
      <Button>123</Button>
    </UserContainer>
  );
}
