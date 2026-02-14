import type { ReactNode } from "react";
import type { ChipProps } from "@mui/material";

import type { MockResponseItem } from "@/types/mock";
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
  id: string;
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
  item: MockResponseItem;
}

export interface EditorTabPanelProps {
  index?: number;
  value?: number;
  children?: ReactNode;
}
