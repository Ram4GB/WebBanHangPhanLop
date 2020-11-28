import { createReducer, createAction } from "@reduxjs/toolkit";
import { IAccount, ICartItem } from "../../common/interface";
import { MODULE_NAME } from "./models";

export interface IUserState {
  account: IAccount | null;
  carts: Array<ICartItem>;
}

const initialValue: IUserState = {
  account: null,
  carts: [],
};

export const loginAction = createAction<IAccount>(`${MODULE_NAME}_LOGIN`);
export const logoutAction = createAction(`${MODULE_NAME}_LOGOUT`);
export const addToCartAction = createAction<ICartItem>(
  `${MODULE_NAME}_ADD_TO_CART`
);
export const updateCartAction = createAction<{
  newAmount: number;
  productID: any;
}>(`${MODULE_NAME}_UPDATE_CART`);
export const deleteCartAction = createAction<{
  productID: any;
}>(`${MODULE_NAME}_DELETE_CART`);

export default createReducer<IUserState>(initialValue, (builder) => {
  builder
    .addCase(loginAction, (state, action) => {
      state.account = action.payload;
    })
    .addCase(logoutAction, (state) => {
      state.account = null;
    })
    .addCase(addToCartAction, (state, action) => {
      // kiểm tra sản phẩm đã có trong cart hay chưa
      let index = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index === -1) {
        // chưa có
        state.carts.push(action.payload);
      } else {
        // nếu có trong cart rồi thì update lên
        let newItem = Object.assign({}, state.carts[index]);
        newItem.amount += action.payload.amount;
        state.carts = [
          ...state.carts.slice(0, index),
          newItem,
          ...state.carts.slice(index + 1),
        ];
      }
    })
    .addCase(updateCartAction, (state, action) => {
      let index = state.carts.findIndex(
        (item) => item.id === action.payload.productID
      );

      if (index !== -1) {
        state.carts = [
          ...state.carts.slice(0, index),
          { ...state.carts[index], amount: action.payload.newAmount },
          ...state.carts.slice(index + 1),
        ];
      }
    })
    .addCase(deleteCartAction, (state, action) => {
      let index = state.carts.findIndex((item) => {
        console.log(item.id, action.payload.productID);
        return item.id === action.payload.productID;
      });

      console.log(index);

      if (index !== -1) {
        state.carts = [
          ...state.carts.slice(0, index),
          ...state.carts.slice(index + 1),
        ];
      }
    });
});
