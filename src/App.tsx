import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ColorModeProvider, useAppTheme } from "config/theme";
import Pages from "pages";
import { IntlProvider } from "react-intl";
import messagesInEnglish from "locales/en";

function App() {
  const { colorMode, theme } = useAppTheme();

  return (
    <IntlProvider messages={messagesInEnglish} locale="en" defaultLocale="en">
      <ColorModeProvider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Pages />
        </ThemeProvider>
      </ColorModeProvider>
    </IntlProvider>
  );
}

export default App;
