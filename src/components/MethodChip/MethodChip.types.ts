import type { ChipProps } from "@mui/material";

import type { Method } from "@/types/network";

export type MethodColor = Record<Method, ChipProps["color"]>;

export interface MethodChipProps extends ChipProps {
  method: Method;
}
