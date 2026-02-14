import { useState } from "react";
import { ArrowDropDown, ArrowDropUp, Warning } from "@mui/icons-material";
import { Box, Collapse, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { orange } from "@mui/material/colors";

import { useMockStore } from "@/store/mock";

import ConfirmDialog from "../ConfirmDialog";
import MethodChip from "../MethodChip";

import type { SidebarItemProps } from "./Sidebar.types";
import SidebarItemMenu from "./SidebarItemMenu";

function SidebarItem({
  index = 0,
  mockName = "",
  responseItems = [],
  mocksLength = 0,
  selectedMock = "",
  onSelectedMock
}: SidebarItemProps) {
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Store
  const deleteMock = useMockStore(state => state.deleteMock);
  const deleteResponse = useMockStore(state => state.deleteResponse);

  const updateMockOrder = useMockStore(state => state.updateMockOrder);
  const updateResponseOrder = useMockStore(state => state.updateResponseOrder);

  return (
    <>
      <ListItemButton
        selected={selectedMock === mockName}
        onClick={() => {
          onSelectedMock?.(mockName);
        }}
      >
        <ListItemIcon sx={{ minWidth: "fit-content", marginRight: 1 }}>
          <SidebarItemMenu
            index={index}
            itemsLength={mocksLength}
            onChangeOrderDown={() => {
              updateMockOrder(mockName, "DOWN");
            }}
            onChangeOrderUp={() => {
              updateMockOrder(mockName, "UP");
            }}
            onDelete={() => {
              setIsConfirmOpen(true);
            }}
          />
        </ListItemIcon>

        <ListItemText>{mockName}</ListItemText>

        <IconButton
          type="button"
          onClick={() => {
            setIsCollapseOpen(!isCollapseOpen);
          }}
        >
          {isCollapseOpen ? <ArrowDropUp /> : <ArrowDropDown />}
        </IconButton>
      </ListItemButton>

      <Collapse unmountOnExit in={isCollapseOpen}>
        <List disablePadding>
          {responseItems.map((item, itemIdx) => (
            <ListItemButton
              key={item.id}
              sx={{ pl: 4 }}
              onClick={() => {
                onSelectedMock?.(mockName);
              }}
            >
              <ListItemIcon>
                <MethodChip method={item.method} size="small"></MethodChip>
              </ListItemIcon>

              <ListItemText>{item.url}</ListItemText>

              <SidebarItemMenu
                index={itemIdx}
                itemsLength={responseItems.length}
                onChangeOrderDown={() => {
                  updateResponseOrder(item.id, "DOWN");
                }}
                onChangeOrderUp={() => {
                  updateResponseOrder(item.id, "UP");
                }}
                onDelete={() => {
                  deleteResponse(item.id);
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ConfirmDialog
        cancelText="No"
        confirmText="Yes"
        content={`Are you sure you want to delete ${mockName} ?`}
        open={isConfirmOpen}
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Warning sx={{ color: orange[500] }} />
            Clear project
          </Box>
        }
        onClose={() => {
          setIsConfirmOpen(false);
        }}
        onConfirm={() => {
          deleteMock(mockName);
        }}
      ></ConfirmDialog>
    </>
  );
}

export default SidebarItem;
