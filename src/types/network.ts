import type { ChipProps } from "@mui/material";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type MethodColor = Record<Method, ChipProps["color"]>;
