import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { IRootState } from "../../modules";
import ChangePasswordPage from "../../pages/ChangePasswordPage";
import ComboDetailPage from "../../pages/ComboDetailPage";
import HomePage from "../../pages/HomePage";
import MyCartPage from "../../pages/MyCartPage";
import NotFoundPage from "../../pages/NotFoundPage";
import ProductFilterPage from "../../pages/ProductFilterPage";
import StaticsOrderPage from "../../pages/StaticsOrderPage";
import UserOrderPage from "../../pages/UserOrderPage";
import UserPage from "../../pages/UserPage";

export default function Routes() {
  const account = useSelector((state: IRootState) => state.user.account);

  if (account) {
    return (
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={MyCartPage} path="/carts" exact />
        <Route component={ComboDetailPage} path="/combo/:comboID" exact />
        <Route component={ProductFilterPage} path="/products" exact />
        <Route component={UserPage} path="/me/info" exact />
        <Route component={UserOrderPage} path="/me/order" exact />
        <Route
          component={ChangePasswordPage}
          path="/me/change-password"
          exact
        />
        <Route component={StaticsOrderPage} path="/me/statitics-order" exact />
        <Route component={NotFoundPage} path="*" exact />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={MyCartPage} path="/carts" exact />
        <Route component={ComboDetailPage} path="/combo/:comboID" exact />
        <Route component={ProductFilterPage} path="/products" exact />
        <Route component={NotFoundPage} path="*" exact />
      </Switch>
    );
  }
}
