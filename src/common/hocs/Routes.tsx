import React from "react";
import { Route, Switch } from "react-router-dom";
import ChangePasswordPage from "../../pages/ChangePasswordPage";
import ComboDetailPage from "../../pages/ComboDetailPage";
import HomePage from "../../pages/HomePage";
import MyCartPage from "../../pages/MyCartPage";
import NotFoundPage from "../../pages/NotFoundPage";
import ProductFilterPage from "../../pages/ProductFilterPage";
import UserOrderPage from "../../pages/UserOrderPage";
import UserPage from "../../pages/UserPage";

export default function Routes() {
  const user = { role: "admin" };

  if (user.role === "admin") {
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
        <Route component={NotFoundPage} path="*" exact />
      </Switch>
    );
  }

  return null;
}
