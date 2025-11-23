import { Menu } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import DeleteButton from "./DeleteButton";
import ReloadButton from "./ReloadButton";
import StartButton from "./StartButton";
import ThemeButton from "./ThemeButton";

function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: theme =>
          theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.main
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <IconButton sx={{ color: "white" }}>
          <Menu></Menu>
        </IconButton>

        <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "white" }} variant="h1">
          Mockar
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "8px" }}>
        <ThemeButton></ThemeButton>
        <DeleteButton></DeleteButton>
        <ReloadButton></ReloadButton>
        <StartButton></StartButton>
      </Box>
    </Box>
  );
}

export default Header;
