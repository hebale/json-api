import type { ReactElement } from "react";

export type HeaderProps = {
  left?: ReactElement;
  right?: ReactElement;
};

export type ContentsProps = {
  children?: ReactElement | ReactElement[];
};
