import { Button, Container, Typography, Box, Stack } from "@mui/material";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

interface Props {
  message: string;
  onRetry?: () => void;
}

function ErrorState(props: Props) {
  const t = useIntl();
  const navigate = useNavigate();
  const { onRetry, message } = props;
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
      <Container maxWidth="xs">
        <Stack spacing={2}>
          <Typography variant="h4">{message}</Typography>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => navigate(-1)}>
              {t.formatMessage({ id: "button.goback" })}
            </Button>
            {!!onRetry && (
              <Button onClick={onRetry}>
                {t.formatMessage({ id: "button.retry" })}
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

ErrorState.defaultProps = {
  onRetry: null,
};

export default ErrorState;
