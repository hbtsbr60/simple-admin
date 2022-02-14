import { useAuthState } from "api/auth";
import {
  BrowserRouter,
  Navigate,
  Outlet,
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
import Permissions from "./permissions/Permissions";
import CreateUserForm from "./users/CreateUserForm";

function Authenticated({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isLoggedIn } = useAuthState();

  if (!isLoggedIn) {
    return (
      <Navigate to={routeNameMap.LOGIN} state={{ from: location }} replace />
    );
  }

  return children;
}

const pages = [
  {
    path: routeNameMap.ROLES,
    element: <Roles />,
  },
  {
    path: routeNameMap.MESSAGES,
    element: <Messages />,
  },
  {
    path: routeNameMap.PERMISSIONS,
    element: <Permissions />,
  },
];

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={routeNameMap.LOGIN} element={<Login />} />
          <Route
            path={routeNameMap.HOME}
            element={
              <Authenticated>
                <AppLayout />
              </Authenticated>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path={routeNameMap.USERS} element={<Outlet />}>
              <Route index element={<Users />} />
              <Route path={routeNameMap.CREATE} element={<CreateUserForm />} />
            </Route>
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
