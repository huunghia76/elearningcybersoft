import { Button as ButtonA, ButtonProps as ButtonPropsA } from "antd";

type ButtonProps = ButtonPropsA & {};
export const Button = (props: ButtonProps) => {
  return <ButtonA {...props} />;
};
