import { Box, Button, Divider, Drawer, Toolbar } from "@mui/material";

import { useMockStore } from "@/store/mock";

import type { SidebarProps } from "./Sidebar.types";
import SidebarItem from "./SidebarItem";

function Sidebar({ open = false, onToggleSidebar, onToggleAddDialog }: SidebarProps) {
  const { mocks, selectedMock, setSelectedMock } = useMockStore();

  return (
    <Drawer open={open} onClose={onToggleSidebar}>
      <Toolbar sx={{ justifyContent: "center" }}>Mockar</Toolbar>

      <Divider></Divider>

      <Box sx={{ width: 350, height: "calc(100% - 66px)", display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {mocks.map((mock, mockIdx) => (
            <SidebarItem
              key={mock.name}
              index={mockIdx}
              mockName={mock.name}
              mocksLength={mocks.length}
              responseItems={mock.items}
              selectedMock={selectedMock}
              onSelectedMock={setSelectedMock}
            ></SidebarItem>
          ))}
        </Box>

        <Divider></Divider>

        <Box sx={{ display: "flex", height: 50 }}>
          <Button
            fullWidth
            sx={{ borderRadius: 0, color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
            variant="text"
            onClick={onToggleAddDialog}
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
