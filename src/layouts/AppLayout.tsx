import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { useIntl } from "react-intl";
import { Avatar, LinearProgress, Menu, MenuItem, Tooltip } from "@mui/material";
import {
  Dashboard,
  PersonOutlined,
  BadgeOutlined,
  DarkMode,
} from "@mui/icons-material";
import { useAuth, useGetMe } from "api/auth";
import { useColorMode } from "config/theme";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const t = useIntl();
  const { toggleColorMode } = useColorMode();
  const { loading, user } = useGetMe();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>();

  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen(!mobileOpen);
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

  const drawerMainItems = [
    {
      icon: <Dashboard />,
      text: t.formatMessage({
        id: "drawer.dashboard",
      }),
    },
  ];

  const entities = [
    {
      icon: <PersonOutlined />,
      text: t.formatMessage({
        id: "entity.users",
      }),
    },
    {
      icon: <BadgeOutlined />,
      text: t.formatMessage({
        id: "entity.roles",
      }),
    },
  ];

  const menuItems = [
    {
      text: t.formatMessage({
        id: "menu.logout",
      }),
      onClick: logout,
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawerMainItems.map(({ text, icon }) => (
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {entities.map(({ text, icon }) => (
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
          <Tooltip title={t.formatMessage({ id: "tooltip.toggle.darkmode" })}>
            <IconButton color="inherit" onClick={toggleColorMode}>
              <DarkMode />
            </IconButton>
          </Tooltip>
          <Tooltip title={user.fullName}>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt={user.fullName} src={user.picture?.thumbnail}>
                {user.firstName[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
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
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
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
        <Outlet />
      </Box>
    </Box>
  );
}
