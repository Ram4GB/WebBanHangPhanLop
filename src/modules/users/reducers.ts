import { createReducer, createAction } from "@reduxjs/toolkit";
import {
  IAccount,
  ICartComboItem,
  ICartProductItem,
} from "../../common/interface";
import { MODULE_NAME } from "./models";

export interface IUserState {
  account: IAccount | null;
  carts: Array<ICartProductItem>;
  comboCarts: Array<ICartComboItem>;
}

const initialValue: IUserState = {
  account: null,
  carts: [],
  comboCarts: [],
};

export const loginAction = createAction<IAccount>(`${MODULE_NAME}_LOGIN`);
export const logoutAction = createAction(`${MODULE_NAME}_LOGOUT`);
// thêm sản phẩm vào giỏ hàng
export const addToCartAction = createAction<ICartProductItem>(
  `${MODULE_NAME}_ADD_TO_CART`
);
export const updateCartAction = createAction<{
  newAmount: number;
  productID: any;
}>(`${MODULE_NAME}_UPDATE_CART`);
export const deleteCartAction = createAction<{
  productID: any;
}>(`${MODULE_NAME}_DELETE_CART`);
// thêm combo vào giỏ hàng
export const addComboToCartAction = createAction<ICartComboItem>(
  `${MODULE_NAME}_ADD_COMBO_TO_CART`
);
export const updateComboCartAction = createAction<{
  newAmount: number;
  comboID: any;
}>(`${MODULE_NAME}_UPDATE_COMBO_CART`);
export const deleteComboCartAction = createAction<{
  comboID: any;
}>(`${MODULE_NAME}_DELETE_COMBO_CART`);

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

      if (index !== -1) {
        state.carts = [
          ...state.carts.slice(0, index),
          ...state.carts.slice(index + 1),
        ];
      }
    })
    .addCase(addComboToCartAction, (state, action) => {
      // kiểm tra combo đã có trong cart hay chưa
      let index = state.comboCarts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index === -1) {
        // chưa có
        state.comboCarts.push(action.payload);
      } else {
        // nếu có trong cart rồi thì update lên
        let newItem = Object.assign({}, state.comboCarts[index]);
        newItem.amount += action.payload.amount;
        state.comboCarts = [
          ...state.comboCarts.slice(0, index),
          newItem,
          ...state.comboCarts.slice(index + 1),
        ];
      }
    })
    .addCase(updateComboCartAction, (state, action) => {
      let index = state.comboCarts.findIndex(
        (item) => item.id === action.payload.comboID
      );

      if (index !== -1) {
        state.comboCarts = [
          ...state.comboCarts.slice(0, index),
          { ...state.comboCarts[index], amount: action.payload.newAmount },
          ...state.comboCarts.slice(index + 1),
        ];
      }
    })
    .addCase(deleteComboCartAction, (state, action) => {
      let index = state.comboCarts.findIndex((item) => {
        return item.id === action.payload.comboID;
      });

      if (index !== -1) {
        state.comboCarts = [
          ...state.comboCarts.slice(0, index),
          ...state.comboCarts.slice(index + 1),
        ];
      }
    });
});
