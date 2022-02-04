import { Box } from "@mui/material";
import { useAuth } from "api/auth";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import routes from "./routes";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={routes.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}

function RedirectAuth({ children }: { children: JSX.Element }) {
  const { state }: any = useLocation();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={state?.from?.pathname || routes.HOME} replace />;
  }

  return children;
}

function Layout() {
  return (
    <Box display="flex" minHeight="100vh">
      <Outlet />
    </Box>
  );
}

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={routes.LOGIN}
            element={
              <RedirectAuth>
                <Login />
              </RedirectAuth>
            }
          />
          <Route
            path={routes.HOME}
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
