import React, { useMemo, useState, createContext } from "react";
import {
  Button,
  CssBaseline,
  PaletteMode,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { grey } from "@mui/material/colors";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#3f20ba",
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: {
            main: "#3f20ba",
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

function App() {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Button variant="contained" onClick={colorMode.toggleColorMode}>
          Hello World
        </Button>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
