import { useMemo, useState, createContext, useContext } from "react";
import { PaletteMode, createTheme, responsiveFontSizes } from "@mui/material";
import { grey } from "@mui/material/colors";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeProvider = ColorModeContext.Provider;

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

export const useColorMode = () => useContext(ColorModeContext);

export const useAppTheme = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
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

  return { colorMode, theme };
};
