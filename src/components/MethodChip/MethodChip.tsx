import { Chip } from "@mui/material";

import type { MethodChipProps, MethodColor } from "./MethodChip.types";

function MethodChip({ method, size, ...props }: MethodChipProps) {
  const methodColor: MethodColor = {
    GET: "success",
    POST: "warning",
    PUT: "secondary",
    PATCH: "info",
    DELETE: "error"
  };

  return <Chip color={methodColor[method]} label={method} size={size} {...props}></Chip>;
}

export default MethodChip;
