import React from "react";
import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = ({ children, cartItemsCount, updateCartCount }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: 0,
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <NavBar
        cartItemsCount={cartItemsCount}
      />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
};
