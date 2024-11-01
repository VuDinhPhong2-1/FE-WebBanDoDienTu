import { Box } from "@mui/material";
import React from "react";
import AccountSiderbar from "../../components/Account/AccountSiderbar";
import OrderInfo from "../../components/Order/OrderInfo";

function OrderPage() {
  const nameRoute = "orders"

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
      <AccountSiderbar nameRoute={nameRoute} />
      <OrderInfo />
    </Box>
  );
}

export default OrderPage;
