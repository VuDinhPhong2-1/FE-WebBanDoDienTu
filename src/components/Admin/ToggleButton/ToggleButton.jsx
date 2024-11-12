import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const ToggleButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "#ffffff",
        zIndex: 1000,
      }}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default ToggleButton;
