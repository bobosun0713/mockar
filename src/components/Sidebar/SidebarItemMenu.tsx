import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";

import type { SidebarItemMenuProps } from "./Sidebar.types";

function SidebarItemMenu({
  index = 0,
  itemsLength = 0,
  onChangeOrderUp,
  onChangeOrderDown,
  onDelete
}: SidebarItemMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  return (
    <>
      <IconButton edge="end" size="small" onClick={handleOpenMenu}>
        <MoreVert></MoreVert>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleOpenMenu}>
        <MenuItem onClick={onDelete}>Delete</MenuItem>

        {index !== 0 && <MenuItem onClick={onChangeOrderUp}>Move to up</MenuItem>}

        {index !== itemsLength - 1 && <MenuItem onClick={onChangeOrderDown}>Move to down</MenuItem>}
      </Menu>
    </>
  );
}

export default SidebarItemMenu;
