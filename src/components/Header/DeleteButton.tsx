import { DeleteSweep } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

function DeleteButton() {
  return (
    <Tooltip
      title="Delete All"
      enterDelay={500}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8]
              }
            }
          ]
        }
      }}
    >
      <IconButton sx={{ color: "white" }}>
        <DeleteSweep></DeleteSweep>
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
