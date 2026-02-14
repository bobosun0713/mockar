import type { MockResponseItem } from "@/types/mock";

export interface SidebarProps {
  open?: boolean;
  onToggleSidebar?: () => void;
  onToggleAddDialog?: () => void;
}

export interface SidebarItemProps {
  index?: number;
  mockName?: string;
  responseItems?: MockResponseItem[];
  mocksLength?: number;
  selectedMock?: string;
  onSelectedMock?: (name: string) => void;
}

export interface SidebarItemMenuProps {
  index?: number;
  itemsLength?: number;
  onChangeOrderUp?: () => void;
  onChangeOrderDown?: () => void;
  onDelete?: () => void;
}
