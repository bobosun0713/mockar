import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import MethodChip from "../MethodChip";

import SidebarItemMenu from "./SidebarItemMenu";

function SidebarItem() {
  const [open, setOpen] = useState(true);

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
              <MethodChip method="GET" size="small"></MethodChip>
            </ListItemIcon>
            <ListItemText> /users</ListItemText>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItem;
