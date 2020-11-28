import { createReducer, createAction } from "@reduxjs/toolkit";
import { IProduct } from "../../common/interface";
import { MODULE_NAME } from "./models";

export interface IProductState {
  productList: Array<IProduct>;
}

const initialValue: IProductState = {
  productList: [],
};

export const getProductListAction = createAction<Array<IProduct>>(
  `${MODULE_NAME}_GET_PRODUCT_LIST`
);

export default createReducer<IProductState>(initialValue, (builder) => {
  builder.addCase(getProductListAction, (state, action) => {
    state.productList = action.payload;
  });
});
