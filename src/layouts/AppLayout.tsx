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
  Tooltip,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth, useGetMe } from "api/auth";
import { Lightbulb, MenuOutlined } from "@mui/icons-material";
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
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ADMIN
          </Typography>
          <IconButton onClick={toggleColorMode} color="inherit">
            <Lightbulb />
          </IconButton>
          <IconButton
            id="menu-appbar"
            aria-controls={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenu}
          >
            <Tooltip title={user.fullName}>
              <Avatar
                alt={user.fullName}
                src={user.picture?.thumbnail}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
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
