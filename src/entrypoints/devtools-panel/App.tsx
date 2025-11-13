import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
    </ThemeProvider>
  );
}

export default App;
