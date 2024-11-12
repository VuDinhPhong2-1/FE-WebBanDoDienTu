import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotAdminPage() {
  const navigate = useNavigate(); // Sử dụng useNavigate thay vì Navigate

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        403 - Trang chỉ giành cho người có quyền lực..
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ marginY: 2 }}>
        Xin lỗi, Bạn chưa đủ quyền lực
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Quay về Trang chủ
      </Button>
    </Box>
  );
}

export default NotAdminPage;
