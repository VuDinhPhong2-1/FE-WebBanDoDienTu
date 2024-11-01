import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

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
        404 - Trang không tồn tại
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ marginY: 2 }}>
        Xin lỗi, trang bạn đang tìm kiếm chưa được phát triển hoặc không tồn tại.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Quay về Trang chủ
      </Button>
    </Box>
  );
}

export default NotFoundPage;
