import type { ReactNode } from "react";
import type { DialogProps } from "@mui/material";

export interface ConfirmDialogProps extends Pick<DialogProps, "open" | "maxWidth" | "fullWidth"> {
  id?: string;
  title?: string | ReactNode;
  content?: string | ReactNode;
  cancelText?: string;
  confirmText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}
