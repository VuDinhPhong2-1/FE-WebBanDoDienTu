import { Box } from "@mui/material";
import React from "react";
import AccountSiderbar from "../../components/Account/AccountSiderbar";
import AccountInfo from "../../components/Account/AccountInfo";

function AccountPage() {

  const nameRoute = "profile";
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "336px",
        alignItems: "center",
        background: "#CBDCEA",
        justifyContent: "center",
        gap: 2,
        padding:"15px"
      }}
    >
      <AccountSiderbar nameRoute={nameRoute} />
      <AccountInfo />
    </Box>
  );
}

export default AccountPage;
