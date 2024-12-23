import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  styled,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FaCreditCard,
  FaPercent,
  FaWrench,
  FaUserTie,
  FaNewspaper,
  FaBars,
} from "react-icons/fa";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { HotLine } from "./HotLine";
import { StoreLocator } from "./StoreLocator";
import { LoginRegister } from "./LoginRegister";
import { Cart } from "./Cart";
import { CategoryMenu } from "./CategoryMenu";
import React, { useState } from "react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#D91E1E",
  position: "fixed",
  top: 0,
}));

const SecondaryNav = styled(Box)(({ theme }) => ({
  backgroundColor: "#000000",
  color: "#FFFFFF",
  height: "37.8px",
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  width: "100%",
  top: "60px",
  zIndex: 2,
  [theme.breakpoints.down("md")]: {
    display: "none", // Ẩn SecondaryNav khi màn hình nhỏ
  },
}));

const NavItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "none",
    color: "red",
  },
  marginLeft: "40px",
}));

export const NavBar = ({ cartItemsCount, setUser }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Kiểm tra kích thước màn hình
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = (
    <List>
      <ListItem button>
        <ListItemIcon>
          <FaCreditCard />
        </ListItemIcon>
        <ListItemText primary="Hướng dẫn thanh toán" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FaPercent />
        </ListItemIcon>
        <ListItemText primary="Hướng dẫn trả góp" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FaWrench />
        </ListItemIcon>
        <ListItemText primary="Tra cứu bảo hành" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FaUserTie />
        </ListItemIcon>
        <ListItemText primary="Tuyển dụng" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FaNewspaper />
        </ListItemIcon>
        <ListItemText primary="Tin công nghệ" />
      </ListItem>
    </List>
  );

  return (
    <>
      {/* StyledAppBar */}
      <StyledAppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: isMobile ? "space-between" : "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              justifyContent: "center",
            }}
          >
            <Logo />
            {!isMobile && <Search />}
          </Box>
          {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <FaBars />
            </IconButton>
          ) : (
            <Box
              sx={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
            >
              <HotLine />
              <StoreLocator />
              <LoginRegister setUser={setUser} />
              <Cart cartItemsCount={cartItemsCount} />
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* SecondaryNav */}
      <SecondaryNav>
        <CategoryMenu />
        <NavItem>
          <FaCreditCard />
          <Typography
            variant="body2"
            sx={{ marginLeft: 1, whiteSpace: "nowrap" }}
          >
            Hướng dẫn thanh toán
          </Typography>
        </NavItem>
        <NavItem>
          <FaPercent />
          <Typography
            variant="body2"
            sx={{ marginLeft: 1, whiteSpace: "nowrap" }}
          >
            Hướng dẫn trả góp
          </Typography>
        </NavItem>
        <NavItem>
          <FaWrench />
          <Typography
            variant="body2"
            sx={{ marginLeft: 1, whiteSpace: "nowrap" }}
          >
            Tra cứu bảo hành
          </Typography>
        </NavItem>
        <NavItem>
          <FaUserTie />
          <Typography
            variant="body2"
            sx={{ marginLeft: 1, whiteSpace: "nowrap" }}
          >
            Tuyển dụng
          </Typography>
        </NavItem>
        <NavItem>
          <FaNewspaper />
          <Typography
            variant="body2"
            sx={{ marginLeft: 1, whiteSpace: "nowrap" }}
          >
            Tin công nghệ
          </Typography>
        </NavItem>
      </SecondaryNav>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerItems}
      </Drawer>

      {/* Add some padding to push content below the fixed navbar */}
      <Box sx={{ marginTop: "107px" }}></Box>
    </>
  );
};
