import { Button, Container } from "@mui/material";
import { useAuth } from "api/auth";

function Home() {
  const { logout } = useAuth();

  return (
    <Container fixed>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export default Home;
