/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import Link, { LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";
import routeNameMap from "constants/routeNameMap";
import { useIntl } from "react-intl";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

LinkRouter.defaultProps = {
  replace: undefined,
};

function RouterBreadcrumbs() {
  const t = useIntl();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = React.useMemo(
    () => ({
      [routeNameMap.USERS]: t.formatMessage({ id: "entity.users" }),
      [routeNameMap.ROLES]: t.formatMessage({ id: "entity.roles" }),
      [routeNameMap.MESSAGES]: t.formatMessage({ id: "entity.messages" }),
      [routeNameMap.PERMISSIONS]: t.formatMessage({ id: "entity.permissions" }),
    }),
    [t.locale]
  );

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default RouterBreadcrumbs;
