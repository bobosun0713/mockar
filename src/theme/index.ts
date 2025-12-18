import { createTheme } from "@mui/material/styles";

import components from "./components"; // 引入上面的檔案

const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true
  },
  components
});

export default theme;
