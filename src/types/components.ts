import type { ReactNode } from "react";

export type DownloadFileProps = {
  url: string;
  fileName?: string;
};

export type ModalProps = {
  id?: number;
  title: string;
  height: number;
  width: number;
  body?: ReactNode;
  control?: (control: ModalDispatchAction) => ReactNode;
};

export type ModalDispatchAction = {
  open: (modal: ModalProps) => void;
  close: (id: number) => void;
};
