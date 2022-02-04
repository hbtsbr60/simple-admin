import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";

function Login() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
      <Container maxWidth="xs">
        <Paper elevation={1}>
          <Box p={4}>
            <Stack spacing={2}>
              <Box textAlign="center">
                <Typography variant="h5">Simple Admin</Typography>
              </Box>
              <TextField required label="Username" placeholder="Username" />
              <TextField required label="Password" placeholder="Password" />
              <Button variant="contained">Login</Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
