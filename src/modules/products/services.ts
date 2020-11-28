import Axios from "axios";
import { rootAPI } from "../../common/config";

export const getProductList = () =>
  Axios({
    method: "GET",
    url: `${rootAPI}/Products`,
  });
