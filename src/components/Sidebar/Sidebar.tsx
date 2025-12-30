import { Box, Button, Divider, Drawer, Toolbar } from "@mui/material";

import type { SidebarProps } from "./Sidebar.types";

function Sidebar({ isOpen = false, onToggleSidebar }: SidebarProps) {
  return (
    <Drawer open={isOpen} onClose={onToggleSidebar}>
      <Toolbar sx={{ justifyContent: "center" }}>Mockar</Toolbar>

      <Divider></Divider>

      <Box sx={{ width: 350, height: "calc(100% - 66px)", display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, overflowY: "auto" }}></Box>

        <Divider></Divider>

        <Box sx={{ display: "flex", height: 50 }}>
          <Button
            fullWidth
            sx={{ borderRadius: 0, color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
            variant="text"
          >
            Add Project
          </Button>

          <Divider orientation="vertical"></Divider>

          <Button
            fullWidth
            sx={{ borderRadius: 0, color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
            variant="text"
          >
            Import
          </Button>

          <Divider orientation="vertical"></Divider>

          <Button
            fullWidth
            sx={{ borderRadius: 0, color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
            variant="text"
          >
            Export
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
