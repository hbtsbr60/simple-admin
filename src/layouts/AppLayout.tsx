import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Avatar, LinearProgress, Menu, MenuItem, Tooltip } from "@mui/material";
import {
  Dashboard,
  PersonOutlined,
  BadgeOutlined,
  DarkMode,
  NotificationsOutlined,
  MailOutline,
  Fingerprint,
} from "@mui/icons-material";
import { useLogout, useGetMe } from "api/auth";
import { useColorMode } from "config/theme";
import routeNameMap from "constants/routeNameMap";
import { DRAWER_WIDTH } from "constants/styles";
import ErrorState from "components/ErrorState";
import ListItemLink from "components/ListItemLink";
import RouterBreadcrumbs from "components/RouterBreadcrumbs";

const drawerWidth = DRAWER_WIDTH;

export default function AppLayout() {
  const t = useIntl();
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const { loading, user, error, handleRefresh } = useGetMe();
  const { logout } = useLogout();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>();

  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleOpenUserMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);

  if (loading) {
    return <LinearProgress style={{ width: "100%" }} />;
  }

  if (!user || error) {
    return (
      <ErrorState
        message={t.formatMessage({ id: "error.something.went.wrong" })}
        onRetry={handleRefresh}
      />
    );
  }

  const drawerMainItems = [
    {
      to: routeNameMap.HOME,
      icon: <Dashboard />,
      text: t.formatMessage({
        id: "drawer.dashboard",
      }),
    },
  ];

  const authSection = [
    {
      to: routeNameMap.USERS,
      icon: <PersonOutlined />,
      text: t.formatMessage({
        id: "entity.users",
      }),
    },
    {
      to: routeNameMap.ROLES,
      icon: <BadgeOutlined />,
      text: t.formatMessage({
        id: "entity.roles",
      }),
    },
    {
      to: routeNameMap.PERMISSIONS,
      icon: <Fingerprint />,
      text: t.formatMessage({
        id: "entity.permissions",
      }),
    },
  ];

  const reportsSections = [
    {
      to: routeNameMap.MESSAGES,
      icon: <MailOutline />,
      text: t.formatMessage({
        id: "entity.messages",
      }),
    },
  ];

  const menuItems = [
    {
      text: t.formatMessage({
        id: "menu.profile",
      }),
      onClick: () => navigate(`${routeNameMap.USERS}/${user.id}`),
    },
    {
      text: t.formatMessage({
        id: "menu.logout",
      }),
      onClick: logout,
    },
  ];

  const renderMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {menuItems.map(({ text, onClick }) => (
        <MenuItem key={text} onClick={onClick}>
          <Typography textAlign="center">{text}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawerMainItems.map(({ text, icon, to }) => (
          <ListItemLink key={to} to={to} primary={text} icon={icon} />
        ))}
      </List>
      <Divider />
      <List>
        {authSection.map(({ text, icon, to }) => (
          <ListItemLink key={to} to={to} primary={text} icon={icon} />
        ))}
      </List>
      <Divider />
      <List>
        {reportsSections.map(({ text, icon, to }) => (
          <ListItemLink key={to} to={to} primary={text} icon={icon} />
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" flex={1}>
            {t.formatMessage({
              id: "app.name",
            })}
          </Typography>
          <Tooltip title={t.formatMessage({ id: "tooltip.notifications" })}>
            <IconButton size="large" color="inherit" onClick={() => null}>
              <NotificationsOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title={t.formatMessage({ id: "tooltip.toggle.darkmode" })}>
            <IconButton size="large" color="inherit" onClick={toggleColorMode}>
              <DarkMode />
            </IconButton>
          </Tooltip>
          <Tooltip title={user.fullName}>
            <IconButton edge="end" size="large" onClick={handleOpenUserMenu}>
              <Avatar alt={user.fullName} src={user.picture?.thumbnail}>
                {user.firstName[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
          {renderMenu}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="drawer"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <RouterBreadcrumbs />
        <Outlet />
      </Box>
    </Box>
  );
}
