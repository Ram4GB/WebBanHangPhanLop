import React from "react";
import { Route, Switch } from "react-router-dom";
import ComboDetailPage from "../../pages/ComboDetailPage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import MyCartPage from "../../pages/MyCartPage";
import NotFoundPage from "../../pages/NotFoundPage";

export default function Routes() {
  const user = { role: "admin" };

  if (user.role === "admin") {
    return (
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={LoginPage} path="/login" exact />
        <Route component={MyCartPage} path="/carts" exact />
        <Route component={ComboDetailPage} path="/combo/:comboID" exact />
        <Route component={NotFoundPage} path="*" exact />
      </Switch>
    );
  }

  return null;
}
