import type { DialogProps } from "@mui/material";

export interface ConfirmDialogProps extends Pick<DialogProps, "open" | "maxWidth" | "fullWidth"> {
  id?: string;
  title?: string;
  content?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}
