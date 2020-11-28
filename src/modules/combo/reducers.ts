import { createReducer, createAction } from "@reduxjs/toolkit";
import { ICombo } from "../../common/interface";
import { MODULE_NAME } from "./models";

export interface IComboState {
  comboList: Array<ICombo>;
}

const initialValue: IComboState = {
  comboList: [],
};

export const getListComboAction = createAction<Array<ICombo>>(
  `${MODULE_NAME}_GET_LIST_COMBO`
);

export default createReducer<IComboState>(initialValue, (builder) => {
  builder.addCase(getListComboAction, (state, action) => {
    state.comboList = action.payload;
  });
});
