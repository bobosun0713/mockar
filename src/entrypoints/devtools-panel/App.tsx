import { useState } from "react";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import EditorArea from "@/components/EditorArea";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import theme from "@/theme";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider defaultMode="light" theme={theme}>
      <CssBaseline></CssBaseline>

      <Box
        sx={{
          minWidth: 1024,
          height: "100%",
          overflow: "hidden"
        }}
      >
        <Header
          onToggleSidebar={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        ></Header>

        <Sidebar
          isOpen={isSidebarOpen}
          onToggleSidebar={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        ></Sidebar>

        <EditorArea></EditorArea>
      </Box>
    </ThemeProvider>
  );
}

export default App;
