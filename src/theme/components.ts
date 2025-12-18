import type { Components, Theme } from "@mui/material/styles";

const components: Components<Theme> = {
  MuiTooltip: {
    defaultProps: {
      enterDelay: 500,
      slotProps: {
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8]
              }
            }
          ]
        }
      }
    }
  }
};

export default components;
