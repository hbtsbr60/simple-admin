import { Button, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth } from "api/auth";

function AppLayout() {
  const { logout } = useAuth();

  return (
    <Container fixed>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
      <Outlet />
    </Container>
  );
}

export default AppLayout;
