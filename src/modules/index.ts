import { combineReducers } from "@reduxjs/toolkit";

import { IUserState } from "../modules/users/reducers";
import { IComboState } from "./combo/reducers";

import userReducer from "./users/reducers";
import comboReducer from "./combo/reducers";
import productReducer from "./products/reducers";

export interface IRootState {
  user: IUserState;
  combo: IComboState;
}

export default combineReducers({
  user: userReducer,
  combo: comboReducer,
  product: productReducer,
});
