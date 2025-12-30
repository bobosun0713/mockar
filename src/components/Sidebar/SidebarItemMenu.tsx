import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";

function SidebarItemMenu() {
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
        <MenuItem>Delete</MenuItem>
        <MenuItem>Move to top</MenuItem>
        <MenuItem>Move to bottom</MenuItem>
      </Menu>
    </>
  );
}

export default SidebarItemMenu;
