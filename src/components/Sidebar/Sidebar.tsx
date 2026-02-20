import type { ChangeEvent } from "react";
import { Box, Button, Divider, Drawer, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useMockStore } from "@/store/mock";
import type { MockProjectItem } from "@/types/mock";
import { downloadJson } from "@/utils";

import type { SidebarProps } from "./Sidebar.types";
import SidebarItem from "./SidebarItem";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

function Sidebar({ open = false, onToggleSidebar, onToggleAddDialog }: SidebarProps) {
  const mocks = useMockStore(state => state.mocks);
  const selectedMock = useMockStore(state => state.selectedMock);
  const setSelectedMock = useMockStore(state => state.setSelectedMock);
  const importMock = useMockStore(state => state.importMock);

  const handleExport = () => {
    downloadJson(mocks);
  };

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileText = await file.text();
      const parsedData = JSON.parse(fileText) as MockProjectItem[];
      importMock(parsedData);
    } catch (e) {
      console.error(e);
    }
  };

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
            component="label"
            sx={{ borderRadius: 0, color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
            variant="text"
          >
            Import
            <VisuallyHiddenInput
              accept=".json, application/json"
              type="file"
              onChange={handleImport}
            ></VisuallyHiddenInput>
          </Button>

          <Divider orientation="vertical"></Divider>

          <Button
            fullWidth
            sx={{ borderRadius: 0, color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
            variant="text"
            onClick={handleExport}
          >
            Export
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
