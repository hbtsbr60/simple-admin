import { Button, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth, useGetMe } from "api/auth";

function AppLayout() {
  const { logout } = useAuth();
  const { user } = useGetMe();
  console.log(user);

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
