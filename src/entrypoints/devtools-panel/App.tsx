import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "@/components/Header";

const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true
  }
});

function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="light">
      <CssBaseline></CssBaseline>
      <Header></Header>
    </ThemeProvider>
  );
}

export default App;
