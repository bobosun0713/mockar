import { DarkMode, Sunny } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useColorScheme } from "@mui/material/styles";

function ThemeButton() {
  const { mode, setMode } = useColorScheme();
  const isDarkMode = mode === "dark";

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
      title={isDarkMode ? "Light mode" : "Dark mode"}
    >
      <IconButton
        size="medium"
        onClick={() => {
          setMode(isDarkMode ? "light" : "dark");
        }}
      >
        {isDarkMode ? <Sunny sx={{ color: orange[500] }} /> : <DarkMode sx={{ color: "white" }} />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeButton;
