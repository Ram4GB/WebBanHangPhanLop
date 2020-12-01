import { createReducer, createAction } from "@reduxjs/toolkit";
import {
  IAccount,
  ICartComboItem,
  ICartProductItem,
} from "../../common/interface";
import { MODULE_NAME } from "./models";

enum MODE {
  light = "light",
  dark = "dark",
}
export interface IUserState {
  account: IAccount | null;
  carts: Array<ICartProductItem>;
  comboCarts: Array<ICartComboItem>;
  lang: string;
  mode: MODE;
  mobile: {
    isShowNavbar: boolean;
  };
}

const initialValue: IUserState = {
  account: null,
  carts: [],
  comboCarts: [],
  lang: "vi_VN",
  mode: MODE.light,
  mobile: {
    isShowNavbar: false,
  },
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
export const clearCart = createAction(`${MODULE_NAME}_CLEAR_CART`);
export const setLang = createAction<string>(`${MODULE_NAME}_SET_LANG`);
export const toggleMode = createAction(`${MODULE_NAME}_TOGGLE_MODE`);
export const toggleNavbarMobile = createAction(
  `${MODULE_NAME}_TOGGLE_NAVBAR_MOBILE`
);

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
    })
    .addCase(clearCart, (state, action) => {
      state.carts = [];
      state.comboCarts = [];
    })
    .addCase(setLang, (state, action) => {
      state.lang = action.payload;
    })
    .addCase(toggleMode, (state, action) => {
      if (state.mode === MODE.light) {
        state.mode = MODE.dark;
      } else {
        state.mode = MODE.light;
      }
    })
    .addCase(toggleNavbarMobile, (state, action) => {
      state.mobile.isShowNavbar = !state.mobile.isShowNavbar;
    });
});
