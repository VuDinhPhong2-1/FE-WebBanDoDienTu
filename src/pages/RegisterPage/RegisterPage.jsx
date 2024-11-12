import { Box, Button, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const Container = styled(Box)`
  display: flex;
  width: 100%;
  background: #d7e4ef;
  max-height: 100%;
  height: 500px;
  align-items: center;
  justify-content: center;
`;

const FormRegister = styled(Box)`
  display: flex;
  max-width: 650px;
  width: 100%;
  padding: 15px;
  background: white;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled(TextField)`
  max-width: 590px;
  width: 100%;
`;

function RegisterPage() {
  const [fullName, setFullName] = useState(""); // Đổi từ username sang fullName
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auths/signup", {
        fullName, // Sử dụng fullName thay vì username
        password,
        email,
        phone,
      });

      enqueueSnackbar("Đăng ký thành công!", { variant: "success" });
      navigate("/login"); // Chuyển hướng tới trang đăng nhập
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
      const errorMessage =
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <Container>
      <FormRegister component="form" onSubmit={handleRegister}>
        <Typography variant="h5" textAlign="center">
          Tạo tài khoản
        </Typography>
        <StyledInput
          label="Tên đầy đủ"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />
        <StyledInput
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <StyledInput
          label="Số điện thoại"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          autoComplete="tel"
        />
        <StyledInput
          label="Mật khẩu"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "130px", background: "black" }}
        >
          Đăng ký
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            ↩ Quay lại đăng nhập
          </Link>
        </Typography>
      </FormRegister>
    </Container>
  );
}

export default RegisterPage;
