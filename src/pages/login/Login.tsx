import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";

function Login() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container maxWidth="xs">
        <Stack spacing={2}>
          <Box textAlign="center">
            <Typography variant="h5">Simple Admin</Typography>
          </Box>
          <TextField required label="Username" placeholder="Username" />
          <TextField required label="Password" placeholder="Password" />
          <Button variant="contained">Login</Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Login;
