import { AppBar, Toolbar, Typography, Box, styled } from "@mui/material";
import {
  FaCreditCard,
  FaPercent,
  FaWrench,
  FaUserTie,
  FaNewspaper,
} from "react-icons/fa";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { HotLine } from "./HotLine";
import { StoreLocator } from "./StoreLocator";
import { LoginRegister } from "./LoginRegister";
import { Cart } from "./Cart";
import { CategoryMenu } from "./CategoryMenu";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#D91E1E",
  position: "fixed", // Make it fixed
  top: 0, // Align to the top
}));

const SecondaryNav = styled(Box)(({ theme }) => ({
  backgroundColor: "#000000",
  color: "#FFFFFF",
  height: "37.8px",
  display: "flex",
  justifyContent: "center",
  position: "fixed", // Make it fixed as well
  width: "100%",
  top: "70px", // Place it right below the main AppBar
  zIndex: 2,
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
  return (
    <>
      {/* StyledAppBar */}
      <StyledAppBar position="fixed">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1200px",
              height: "70px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              {/* Logo component*/}
              <Logo />
              {/* Search component */}
              <Search />
            </Box>
            {/* List Menu Items */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* HotLine */}
              <HotLine />
              {/* StoreLocator */}
              <StoreLocator />
              {/* Login Register */}
              <LoginRegister setUser={setUser} />
              {/* Cart */}
              <Cart cartItemsCount={cartItemsCount} />
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {/* SecondaryNav */}
      <SecondaryNav>
        {/* Categories Menu */}
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

      {/* Add some padding to push content below the fixed navbar */}
      <Box sx={{ marginTop: "107px" }}></Box>
    </>
  );
};
