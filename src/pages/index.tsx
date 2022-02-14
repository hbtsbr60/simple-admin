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
import NewUserForm from "./users/NewUserForm";
import NewRoleForm from "./roles/NewRoleForm";
import NewPermissionForm from "./permissions/NewPermissionForm";
import ShowUser from "./users/ShowUser";
import ShowRole from "./roles/ShowRole";
import ShowPermission from "./permissions/ShowPermission";

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
    path: routeNameMap.MESSAGES,
    element: <Messages />,
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
              <Route path={routeNameMap.NEW} element={<NewUserForm />} />
              <Route path=":id" element={<ShowUser />} />
            </Route>
            <Route path={routeNameMap.ROLES} element={<Outlet />}>
              <Route index element={<Roles />} />
              <Route path={routeNameMap.NEW} element={<NewRoleForm />} />
              <Route path=":id" element={<ShowRole />} />
            </Route>
            <Route path={routeNameMap.PERMISSIONS} element={<Outlet />}>
              <Route index element={<Permissions />} />
              <Route path={routeNameMap.NEW} element={<NewPermissionForm />} />
              <Route path=":id" element={<ShowPermission />} />
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
