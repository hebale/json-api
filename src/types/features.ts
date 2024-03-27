import type {
  TooltipProps,
  ButtonProps,
  DialogProps as MuiDialogProps,
} from "@mui/material";

export type DownloadFileProps = {
  url: string;
  fileName?: string;
};

/**
 * Dialog type
 */
export type DialogProps = {
  id?: number;
  open?: boolean;
  title: string;
  content: JSX.Element;
  actions?: ActionProps[];
};

export type ActionProps = ButtonProps & {
  text: string;
  onAction: (cb: () => void, datas: any) => void;
};

export type DialogDispatchAction = {
  open: (dialog: DialogProps) => void;
  close: (id: number) => void;
};

/**
 * Alert type
 */
export type AlertProps = {
  id?: number;
  type: "success" | "info" | "warning" | "error";
  message: string;
  timer?: number;
};

export type AlertDispetchProps = {
  open: (alert: AlertProps) => void;
  close: (id: number) => void;
};

/**
 * DropBox type
 */
export type DropBoxEvent = (e: React.DragEvent<HTMLDivElement>) => void;

export type DropFile = {
  name: string;
  size: number;
  data: string | ArrayBuffer | null;
};

export type DropBoxProps = {
  allow: string[];
  onDrop: (file: DropFile | null) => void;
};

/**
 * CopyButton
 */
export type CopyButtonProps = {
  text: string | null;
  tooltip: Omit<TooltipProps, "children">;
  iconButtonStyle?: { [key: string]: string | number };
  onCopied?: (text: string) => void;
};

/**
 * DownloadButton
 */
export type DownloadButtonProps = {
  url: string;
  fileName: string;
  tooltip: Omit<TooltipProps, "children">;
};
