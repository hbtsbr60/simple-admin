import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";
import { ColorModeProvider, useAppTheme } from "config/theme";
import Pages from "pages";
import { IntlProvider } from "react-intl";
import messagesInEnglish from "locales/en";
import client from "config/client";

function App() {
  const { colorMode, theme } = useAppTheme();

  return (
    <ApolloProvider client={client}>
      <IntlProvider messages={messagesInEnglish} locale="en" defaultLocale="en">
        <ColorModeProvider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Pages />
          </ThemeProvider>
        </ColorModeProvider>
      </IntlProvider>
    </ApolloProvider>
  );
}

export default App;
