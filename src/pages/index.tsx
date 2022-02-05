import { useAuth } from "api/auth";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import RootLayout from "layouts/RootLayout";
import AppLayout from "layouts/AppLayout";
import Login from "./login/Login";
import routes from "./routes";
import Users from "./users/Users";
import Roles from "./roles/Roles";
import Dashboard from "./dashboard/Dashboard";

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

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
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
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path={routes.USERS} element={<Users />} />
            <Route path={routes.ROLES} element={<Roles />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
