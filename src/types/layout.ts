import type { ReactElement } from 'react';

export type HeaderProps = {
  left?: ReactElement;
  right?: ReactElement;
};

export type ContentsProps = {
  head?: ReactElement;
  body?: ReactElement | ReactElement[];
};
