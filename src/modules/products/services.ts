import Axios from "axios";
import { rootAPI } from "../../common/config";

export const getProductList = () =>
  Axios({
    method: "GET",
    url: `${rootAPI}/Products`,
  });
export const getProductByID = (productID: any) =>
  Axios({
    method: "GET",
    url: `${rootAPI}/Products/${productID}`,
  });

export const getCategoryList = () =>
  Axios({
    method: "GET",
    url: `${rootAPI}/Catalogs`,
  });
