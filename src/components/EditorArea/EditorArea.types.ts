import type { ChipProps } from "@mui/material";

import type { Method } from "@/types/network";

export type MethodColor = Record<Method, ChipProps["color"]>;

export interface ResponseItem {
  name: string;
  method: Method;
  status: string;
  response: string;
  delay: string;
}

export interface EditorItemData extends Omit<ResponseItem, "response"> {
  url: string;
  label: string;
  enabled: boolean;
  requestCount: number;
  requestPayload: string;
  responseList: ResponseItem[];
  responseName: string;
  activeResponseName: string;
}

export interface EditorFormData {
  items: EditorItemData[];
}

export interface EditorItemProps {
  index?: number;
}

export interface EditorTabProps {
  children?: React.ReactNode;
  index?: number;
}

export interface EditorTabPanelProps extends EditorTabProps {
  value?: number;
}
