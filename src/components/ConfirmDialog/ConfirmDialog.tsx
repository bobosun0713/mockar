import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import type { ConfirmDialogProps } from "./ConfirmDialog.types";

function ConfirmDialog({
  open = false,
  title = "Confirm Dialog",
  content = "Content...",
  onClose,
  onConfirm,
  ...otherProps
}: ConfirmDialogProps) {
  const handleCancel = () => {
    onClose?.();
  };

  const handleConfirm = () => {
    onClose?.();
    onConfirm?.();
  };

  return (
    <Dialog open={open} {...otherProps}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers>{content}</DialogContent>

      <DialogActions>
        <Button
          sx={{ color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
          variant="text"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          sx={{ color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
          variant="text"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
