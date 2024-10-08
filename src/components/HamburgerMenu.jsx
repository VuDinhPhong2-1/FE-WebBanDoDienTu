import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FiMenu,
  FiHome,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

const StyledMenu = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "center",
  },
}));

const StyledMenuItem = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const menuItems = [
  { text: "Home", icon: <FiHome /> },
  { text: "Profile", icon: <FiUser /> },
  { text: "Settings", icon: <FiSettings /> },
  { text: "Help", icon: <FiHelpCircle /> },
  { text: "Logout", icon: <FiLogOut /> },
];

const HamburgerMenu = ({ customColors }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const menuList = (
    <List>
      {menuItems.map((item) => (
        <StyledMenuItem
          key={item.text}
          onClick={handleDrawerToggle}
          role="menuitem"
          tabIndex={0}
          aria-label={item.text}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </StyledMenuItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: customColors?.appBar }}>
        <Toolbar>
          <StyledIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <FiMenu />
          </StyledIconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          {!isMobile && (
            <StyledMenu>
              {menuItems.map((item) => (
                <IconButton
                  key={item.text}
                  color="inherit"
                  aria-label={item.text}
                  onClick={handleMenuClick}
                >
                  {item.icon}
                </IconButton>
              ))}
            </StyledMenu>
          )}
        </Toolbar>
      </AppBar>
      <nav aria-label="main navigation">
        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: {
                backgroundColor: customColors?.drawer,
                width: 240,
              },
            }}
          >
            {menuList}
          </Drawer>
        ) : (
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.text}
                onClick={handleMenuClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: customColors?.menuItem,
                }}
              >
                {item.icon}
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        )}
      </nav>
    </>
  );
};

export default HamburgerMenu;
