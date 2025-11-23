import { PlayArrow, Stop } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { red } from "@mui/material/colors";

function StartButton() {
  const [start, setStart] = useState(false);

  return (
    <Tooltip
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
      title={start ? "Disable extension" : "Enable extension"}
    >
      <IconButton
        sx={{
          outline: start ? `2px solid ${red["600"]}` : undefined,
          color: "white"
        }}
        onClick={() => {
          setStart(!start);
        }}
      >
        {start ? <Stop sx={{ color: red["600"] }}></Stop> : <PlayArrow></PlayArrow>}
      </IconButton>
    </Tooltip>
  );
}

export default StartButton;
