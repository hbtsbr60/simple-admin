import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ColorModeProvider, useAppTheme } from "config/theme";
import Pages from "pages";

function App() {
  const { colorMode, theme } = useAppTheme();

  return (
    <ColorModeProvider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Pages />
      </ThemeProvider>
    </ColorModeProvider>
  );
}

export default App;
