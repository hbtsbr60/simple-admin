import { useCallback, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth, useGetMe } from "api/auth";
import { Lightbulb } from "@mui/icons-material";
import { useColorMode } from "config/theme";

function AppLayout() {
  const { toggleColorMode } = useColorMode();
  const { logout } = useAuth();
  const { user, loading } = useGetMe();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;

  const handleMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          <IconButton onClick={toggleColorMode} color="inherit">
            <Lightbulb />
          </IconButton>
          <Typography variant="subtitle1">{user.fullName}</Typography>
          <IconButton
            id="menu-appbar"
            aria-controls={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenu}
          >
            <Avatar alt={user.fullName} src={user.picture?.thumbnail} />
          </IconButton>
          <Menu
            keepMounted
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => null}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export default AppLayout;
