import { Button, Container, Typography, Box } from "@mui/material";
import { useIntl } from "react-intl";

interface Props {
  onRetry?: () => void;
}

function ErrorState(props: Props) {
  const t = useIntl();
  const { onRetry } = props;
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
      <Container maxWidth="xs">
        <Typography variant="h4">
          {t.formatMessage({ id: "error.something.went.wrong" })}
        </Typography>
        {!!onRetry && (
          <Button onClick={onRetry}>
            {t.formatMessage({ id: "button.retry" })}
          </Button>
        )}
      </Container>
    </Box>
  );
}

ErrorState.defaultProps = {
  onRetry: null,
};

export default ErrorState;
