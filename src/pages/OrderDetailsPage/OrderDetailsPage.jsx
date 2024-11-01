import { Box } from "@mui/material";
import React from "react";
import AccountSiderbar from "../../components/Account/AccountSiderbar";
import OrderDetailsInfo from "../../components/OrderDetails/OrderDetailsInfo";

function OrderDetailsPage() {
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
        padding: "45px",
      }}
    >
      <AccountSiderbar />
      <OrderDetailsInfo />
    </Box>
  );
}

export default OrderDetailsPage;
