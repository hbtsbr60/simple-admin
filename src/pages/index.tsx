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
import routeNameMap from "constants/routeNameMap";
import Login from "./login/Login";
import Users from "./users/Users";
import Roles from "./roles/Roles";
import Dashboard from "./dashboard/Dashboard";
import Messages from "./messages/Messages";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Navigate to={routeNameMap.LOGIN} state={{ from: location }} replace />
    );
  }

  return children;
}

function RedirectAuth({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={routeNameMap.HOME} replace />;
  }

  return children;
}

const pages = [
  {
    path: routeNameMap.USERS,
    element: <Users />,
  },
  {
    path: routeNameMap.ROLES,
    element: <Roles />,
  },
  {
    path: routeNameMap.MESSAGES,
    element: <Messages />,
  },
];

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path={routeNameMap.LOGIN}
            element={
              <RedirectAuth>
                <Login />
              </RedirectAuth>
            }
          />
          <Route
            path={routeNameMap.HOME}
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            {pages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
