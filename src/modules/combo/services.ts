import Axios from "axios";
import { rootAPI } from "../../common/config";

export const getComboList = () =>
  Axios({
    method: "GET",
    url: `${rootAPI}/Combos`,
  });
export const getComboByID = (comboID: string) =>
  Axios({
    method: "GET",
    url: `${rootAPI}/Combos/${comboID}`,
  });
