import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Chip, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import type { MethodColor } from "@/types/network";

import SidebarItemMenu from "./SidebarItemMenu";

function SidebarItem() {
  const [open, setOpen] = useState(true);

  const methodColor: MethodColor = {
    GET: "success",
    POST: "warning",
    PUT: "secondary",
    PATCH: "info",
    DELETE: "error"
  };

  return (
    <>
      <ListItemButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemText>Project</ListItemText>
        {open ? <ArrowDropUp /> : <ArrowDropDown />}
      </ListItemButton>

      <Collapse unmountOnExit in={open}>
        <List disablePadding>
          <ListItem secondaryAction={<SidebarItemMenu />} sx={{ pl: 4 }}>
            <ListItemIcon>
              <Chip color={methodColor.GET} label="GET" size="small"></Chip>
            </ListItemIcon>
            <ListItemText> /users</ListItemText>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItem;
