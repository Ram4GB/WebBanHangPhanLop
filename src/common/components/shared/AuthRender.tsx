import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../modules";

interface IProps {
  acceptRoles?: Array<string>;
  children: any;
}
export default function AuthRender(props: IProps) {
  const account = useSelector((state: IRootState) => state.user.account);
  return account ? <React.Fragment>{props.children}</React.Fragment> : null;
}

AuthRender.defaultProps = {
  acceptRoles: [],
};
