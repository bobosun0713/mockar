import { Replay } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

function ReloadButton() {
  return (
    <Tooltip
      title="Refresh Extension"
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
      <IconButton
        sx={{ color: "white" }}
        onClick={() => {
          window.location.reload();
        }}
      >
        <Replay></Replay>
      </IconButton>
    </Tooltip>
  );
}

export default ReloadButton;
