import { Box } from "@mui/material";
import { useAuth } from "api/auth";
import Login from "./login/Login";

function Pages() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  return (
    <Box display="flex" minHeight="100vh">
      <Login />
    </Box>
  );
}

export default Pages;
