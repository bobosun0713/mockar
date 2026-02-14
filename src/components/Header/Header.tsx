import { useState } from "react";
import { Add, DarkMode, DeleteSweep, Menu, PlayArrow, Replay, Stop, Sunny, Warning } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import { useColorScheme } from "@mui/material/styles";
import { useShallow } from "zustand/react/shallow";

import { useMockStore } from "@/store/mock";

import ConfirmDialog from "../ConfirmDialog";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  const [start, setStart] = useState(false);
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useColorScheme();

  const isDarkMode = mode === "dark";

  // Store
  const hasMockList = useMockStore(state => state.mocks.length);
  const hasProjectList = useMockStore(
    useShallow(state => state.mocks.find(mock => mock.name === state.selectedMock)?.items.length ?? false)
  );

  const setResponseItem = useMockStore(state => state.setResponseItem);
  const deleteAllResponse = useMockStore(state => state.deleteAllResponse);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  const handleDeleteAll = () => {
    deleteAllResponse();
    handleToggleDialog();
  };

  return (
    <>
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
          <IconButton sx={{ color: "white" }} onClick={onToggleSidebar}>
            <Menu></Menu>
          </IconButton>

          <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "white" }} variant="h1">
            Mockar
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "8px" }}>
          <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
            <IconButton
              size="medium"
              onClick={() => {
                setMode(isDarkMode ? "light" : "dark");
              }}
            >
              {isDarkMode ? <Sunny sx={{ color: orange[500] }} /> : <DarkMode sx={{ color: "white" }} />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Refresh Extension">
            <IconButton
              sx={{ color: "white" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              <Replay></Replay>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete All">
            <IconButton disabled={!hasProjectList} sx={{ color: "white" }} onClick={handleToggleDialog}>
              <DeleteSweep></DeleteSweep>
            </IconButton>
          </Tooltip>

          <Tooltip title={start ? "Disable extension" : "Enable extension"}>
            <IconButton
              disabled={!hasProjectList}
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

          <Tooltip title="Create new mock">
            <IconButton disabled={!hasProjectList && !hasMockList} sx={{ color: "white" }} onClick={setResponseItem}>
              <Add></Add>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <ConfirmDialog
        cancelText="No"
        confirmText="Yes"
        content="Are you sure you want to delete all the mocks?"
        open={open}
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Warning sx={{ color: orange[500] }} />
            Clear data
          </Box>
        }
        onClose={handleToggleDialog}
        onConfirm={handleDeleteAll}
      ></ConfirmDialog>
    </>
  );
}

export default Header;
