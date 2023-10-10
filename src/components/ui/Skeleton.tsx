import {
  Skeleton as SkeletonA,
  SkeletonProps as SkeletonPropsA,
} from "antd";
import { SkeletonButtonProps } from "antd/es/skeleton/Button";
import { SkeletonImageProps } from "antd/es/skeleton/Image";
import { SkeletonInputProps } from "antd/es/skeleton/Input";
import { AvatarProps } from "antd/es/skeleton/Avatar";

type SkeletonObject = {
  (props: SkeletonPropsA): JSX.Element;
  Avatar: React.FC<AvatarProps>;
  Input: React.FC<SkeletonInputProps>;
  Button: React.FC<SkeletonButtonProps>;
  Image: React.FC<SkeletonImageProps>;
};
export const Skeleton: SkeletonObject = (props) => {
  return <Skeleton {...props} />;
};

Skeleton.Avatar = SkeletonA.Avatar;
Skeleton.Button = SkeletonA.Button;
Skeleton.Input = SkeletonA.Input;
Skeleton.Image = SkeletonA.Image;

//oke nhe oke thanks anh