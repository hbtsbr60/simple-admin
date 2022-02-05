/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useMatch,
  useResolvedPath,
} from "react-router-dom";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        (itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
        )
      ),
    [to]
  );

  return (
    <ListItem button component={renderLink} selected={!!match}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
}

ListItemLink.defaultProps = {
  icon: null,
};

export default ListItemLink;
