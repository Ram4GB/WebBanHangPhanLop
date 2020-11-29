import Axios from "axios";
import { rootAPI } from "../../common/config";

// "fullName": "string",
// "address": "string",
// "phoneNumber": "string",
// "email": "string",
// "password": "string",
// "roleName": "string"

export const registerUser = (data: {
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
  roleName: string;
}) => Axios.post(`${rootAPI}/User`, data);

export const login = (data: { email: string; password: string }) =>
  Axios.post(`${rootAPI}/User/Login`, data);

export const updateUser = (
  data: {
    id: number;
    fullName: "string";
    address: "string";
    phoneNumber: "string";
    email: "string";
    roleName: "string";
  },
  userID: any
) => Axios.put(`${rootAPI}/User/${userID}`, data);

export const getMe = (userID: any) => Axios.get(`${rootAPI}/User/${userID}`);

export const updateUserPassword = (
  data: {
    oldPassword: "string";
    newPassword: "string";
  },
  userID: any
) => Axios.put(`${rootAPI}/User/${userID}`, data);
